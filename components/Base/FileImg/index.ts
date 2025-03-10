import type { FileStore } from '@/core/constants'

export default (props: { alt?: string; class: string | string[]; file: FileStore }): VNode => {
  const config = useRuntimeConfig()
  const errorSrc = `/static-media-frontend/pliant/logo-sign-${config.public.name}.svg`
  let spinnerElement: HTMLImageElement | null = null
  let isFullLoad = false
  let lowpollyElement: HTMLImageElement | null = null
  function handleError(event: Event): void {
    const target = event.target as HTMLImageElement
    target.src = errorSrc
  }

  function handleLoad(event: Event): void {
    isFullLoad = true

    const target = event.target as HTMLImageElement

    if (target.classList.contains('opacity-0')) {
      target.style.willChange = 'opacity'
      target.classList.remove('opacity-0')

      target.addEventListener('transitionend', () => {
        requestAnimationFrame(() => {
          if (lowpollyElement && spinnerElement) {
            lowpollyElement.remove()
            spinnerElement.remove()
          }
        })
      })
      return
    }

    requestAnimationFrame(() => {
      if (lowpollyElement && spinnerElement) {
        lowpollyElement.remove()
        spinnerElement.remove()
      }
    })
  }

  return h(
    'div',
    {
      class: [props.class, 'relative overflow-hidden'],
    },
    [
      h('img', {
        alt: props.alt,
        class: ['absolute left-1 top-1 w-4 opacity-20 aspect-square z-1'],
        loading: 'eager',
        onVnodeBeforeMount(vnode) {
          spinnerElement = vnode.el as HTMLImageElement
        },
        src: '/static-media-frontend/pliant/spinner.svg',
      }),
      h('img', {
        alt: props.alt,
        class: [props.class, 'absolute inset-0 w-full h-full z-2 transition-opacity duration-300'],
        loading: 'lazy',
        onError: handleError,
        onLoad: handleLoad,
        onVnodeBeforeMount(vnode) {
          setTimeout(() => {
            if (!isFullLoad && vnode.el) {
              vnode.el.classList.add('opacity-0')
            }
          }, 500)
        },
        src: props.file.completeUrl,
      }),
      h('img', {
        alt: props.alt,
        class: [props.class, ' blur-md'],
        loading: 'eager',
        onVnodeBeforeMount(vnode) {
          lowpollyElement = vnode.el as HTMLImageElement
        },
        src: props.file.lowpollyUrl,
      }),
    ],
  )
}
