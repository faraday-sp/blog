import pLimit from 'p-limit'
const MAX_SINGLE_SIZE = 50 * 1024 * 1024 // (Decimal) 52.4288 MB
// const MAX_SINGLE_SIZE = 50 * 1024 * 1024 // (Decimal) 52.4288 MB
const MIN_CHUNK_SIZE = 5 * 1024 * 1024 // (Decimal) 5.24288 MB
// const MAX_CHUNK_SIZE = 100 * 1024 * 1024 // (Decimal) 104.8576 MB
const partLimit = pLimit(5)
const uploadLimit = pLimit(1)

export function useUpload(): {
  add: (file: File, progress: (value: number) => void) => Promise<{ fileId: string }>
} {
  const config = useRuntimeConfig()
  const baseUrl = `${config.public.isDev ? 'http' : 'https'}://${config.public.uplouderHost}`

  function sendFile(file: Blob | File, endpoint: string, progress: (value: number) => void): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const formData = new FormData()
      formData.append('file', file)
      const xhr = new XMLHttpRequest()
      xhr.open('POST', `${baseUrl}/${endpoint}`)
      xhr.withCredentials = true
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          progress(Math.round((event.loaded / event.total) * 100))
        }
      }

      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response)
        } else {
          reject(new Error(`Request failed with status: ${xhr.status}, status text: ${xhr.statusText}`))
        }
      }

      xhr.onerror = () => {
        reject(new Error(`Request failed with status: ${xhr.status}, status text: ${xhr.statusText}`))
      }

      xhr.send(formData)
    })
  }
  async function part(file: File, progress: (value: number) => void): Promise<{ fileId: string }> {
    const create = await fetch(`${baseUrl}/upload-create`, {
      body: JSON.stringify({
        type: 'collection-logo',
      }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    const createData = await create.json()
    const CREATE_RESERVED_PROGRESS = 1
    const CUNK_RESERVED_PROGRESS = 98
    const COMPLETE_RESERVED_PROGRESS = 1
    progress(CREATE_RESERVED_PROGRESS)

    const totalParts = Math.ceil(file.size / MIN_CHUNK_SIZE)
    const chunkProgressBound = CUNK_RESERVED_PROGRESS / totalParts
    const chunkProgress = new Array(totalParts).fill(0)
    let currentPosition = 0
    let partNumber = 1

    const uploadActive = []
    const partProgress = (value: number, chunkNumber: number): void => {
      chunkProgress[chunkNumber - 1] = (chunkProgressBound * value) / 100
      progress(chunkProgress.reduce((a, b) => a + b) + CREATE_RESERVED_PROGRESS)
    }
    while (currentPosition < file.size) {
      const chunk = file.slice(currentPosition, currentPosition + MIN_CHUNK_SIZE)
      try {
        const copyNumper = partNumber
        partNumber += 1
        const query = new URLSearchParams()
        query.append('uploadId', createData.uploadId)
        query.append('partNumber', copyNumper.toString())
        const newPart = partLimit(async (): Promise<void> => {
          await sendFile(chunk, `upload-part?${query.toString()}`, (value) => partProgress(value, copyNumper))
        })
        uploadActive.push(newPart)
        currentPosition += MIN_CHUNK_SIZE
      } catch (error) {
        console.error(`Ошибка при загрузке части ${partNumber}:`, error)
        throw error
      }
    }
    await Promise.all(uploadActive)

    const complete = await fetch(`${baseUrl}/upload-complete`, {
      body: JSON.stringify({
        parts: partNumber - 1,
        uploadId: createData.uploadId,
      }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    progress(CREATE_RESERVED_PROGRESS + CUNK_RESERVED_PROGRESS + COMPLETE_RESERVED_PROGRESS)
    const fileId = (await complete.json()).fileId as string

    return { fileId }
  }
  async function single(file: File, progress: (value: number) => void): Promise<{ fileId: string }> {
    const query = new URLSearchParams()
    query.append('type', 'collection-logo')
    const response = await sendFile(file, `upload-single?${query.toString()}`, progress)
    const data = JSON.parse(response)

    return { fileId: data.fileId }
  }

  function add(file: File, progress: (value: number) => void): Promise<{ fileId: string }> {
    return uploadLimit(async () => {
      if (file.size > MAX_SINGLE_SIZE) {
        return await part(file, progress)
      }
      return await single(file, progress)
    })
  }

  return {
    add,
  }
}
