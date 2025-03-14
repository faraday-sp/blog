export default (props: { cl?: PropsCl[]; key?: number | string }): VNode => {
  return h('div', {
    class: ['skeleton', ...(props.cl || [])],
    key: props.key,
  })
}
