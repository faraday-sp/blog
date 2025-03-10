import { ClientOnly } from '#components'

export default (props: { fallback?: boolean }, { slots }: { slots: Readonly<Record<string, unknown>> }): VNode => {
  return h(ClientOnly, null, {
    default: props.fallback ? slots.fallback : slots.default,
    fallback: slots.fallback,
  })
}
