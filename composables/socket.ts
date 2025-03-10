import type { SocketEmitList } from '@/core/transports/socket-emit'

import { createSocket, type SocketEventList } from '@/core/transports'
import { Socket } from 'socket.io-client'

export function useSocket<T extends keyof SocketEventList>(
  key?: T,
  handler?: SocketEventList[T],
): {
  emit?: Socket<SocketEventList, SocketEmitList>['emit']
  off: () => void
} {
  const config = useRuntimeConfig()
  // const userStore = useBrickUserStore()
  const instance = getCurrentInstance()
  const isComponent = typeof instance?.type !== 'undefined'

  const socketClient = createSocket(`https://io.${getHost(config)}`)
  if (key && handler) {
    if (isComponent) {
      onMounted(() => {
        socketClient?.io.on(key, handler as never)
      })
      onBeforeUnmount(() => {
        socketClient?.io.off(key, handler as never)
      })
    } else {
      socketClient?.io.on(key, handler as never)
    }
  }

  return {
    emit: socketClient?.io.emit.bind(socketClient?.io),
    off() {
      if (key) {
        socketClient?.io.off(key)
      }
    },
  }
}
