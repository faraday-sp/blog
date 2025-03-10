import style from './style.module.scss'

export default (props: {
  cl?: PropsCl[]
  denominator?: number
  duration?: number
  from?: number
  key?: number | string
  lengthCl?: [number, PropsCl][]
  onChange?: (value: number) => void
  to: number
}): VNode => {
  const from = props.from || 0
  let animationFrame: number | undefined
  let currentValue = from
  let observer: null | ResizeObserver = null

  const numberFormatter = new Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: props.denominator || 0,
    minimumFractionDigits: props.denominator || 0,
  })
  const toFormatted = numberFormatter.format(props.to || 0).replace(',', '.')
  const lengthClass = (props.lengthCl || []).map(([length, cl]) => (toFormatted.length >= length ? cl : ''))

  const base = h('div', {
    innerHTML: numberFormatter.format(currentValue).replace(',', '.'),
    key: props.key,
    onVnodeBeforeUnmount() {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
        props.onChange?.(currentValue)
      }
    },
    onVnodeMounted() {
      const element = base.el
      if (element && props.from !== props.to) {
        const duration = props.duration || 2000
        const startTime = performance.now()

        const updateCounter = (currentTime: number): void => {
          const elapsedTime = currentTime - startTime
          const progress = Math.min(elapsedTime / duration, 1)
          currentValue = Math.abs(progress * (props.to - from) + from)
          element.innerText = numberFormatter.format(currentValue).replace(',', '.')
          if (progress < 1) {
            animationFrame = requestAnimationFrame(updateCounter)
          } else {
            animationFrame = undefined
            props.onChange?.(props.to)
          }
        }

        animationFrame = requestAnimationFrame(updateCounter)
      }
    },
  })

  return h(
    'div',
    {
      class: [style.base, ...(props.cl || []), ...lengthClass],
    },
    [
      base,
      h('span', {
        class: [style.hidden],
        innerHTML: toFormatted,
        key: props.key,
        onVnodeBeforeMount(span) {
          observer = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
              if (base.el) {
                base.el.style.minWidth = `${entry.contentRect.width}px`
              }
            })
          })
          span.el && observer.observe(span.el as HTMLDivElement)
        },
        onVnodeBeforeUnmount() {
          observer?.disconnect()
        },
      }),
    ],
  )
}
