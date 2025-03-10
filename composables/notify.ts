const stack = ref<Notify[]>([])
interface Notify {
  button?: boolean
  description?: string
  duration?: number
  id: string
  title?: string
  type?: 'error' | 'info' | 'success'
}
export function useNotify(): {
  create: (data: Omit<Notify, 'id'>) => void
  remove: (id: string) => void
  stack: Notify[]
} {
  function create(data: Omit<Notify, 'id'>): void {
    stack.value.push({ ...data, id: uuid() })
  }
  function remove(id: string): void {
    stack.value = stack.value.filter((item) => item.id !== id)
  }
  return reactive({
    create,
    remove,
    stack,
  })
}
