export default (props: { alt?: string; priority?: boolean; src?: null | string }): VNode => {
  const config = useRuntimeConfig()
  const errorSrc = `/static-media-frontend/pliant/logo-sign-${config.public.name}.svg`
  function handleError(event: Event): void {
    const target = event.target as HTMLImageElement
    target.src = errorSrc
  }

  return h('img', {
    alt: props.alt,
    loading: props.priority ? 'eager' : 'lazy',
    onError: handleError,
    src: props.src || errorSrc,
  })
}
