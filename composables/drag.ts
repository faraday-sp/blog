export function useDrag(payload?: { onDragEnd?: (event: { item: string; slot: string }) => void }): {
  dragging: ComputedRef<boolean>
  dragItem: Ref<null | string>
  install: (node: Element | null | undefined) => void
} {
  const dragItem = ref<null | string>(null)
  const dragging = computed(() => {
    return Boolean(dragItem.value)
  })

  let controller: AbortController | null = null
  let rootElement: Element | null = null
  let highlightedElement: HTMLDivElement | null = null
  let scrollTimer: NodeJS.Timeout | undefined = undefined
  const SCROLL_SPEED = 12

  function highlight(elementUnder: HTMLDivElement | null): boolean {
    if (elementUnder?.dataset?.dragSlot) {
      if (highlightedElement) {
        delete highlightedElement.dataset.dragHighlight
      }
      highlightedElement = elementUnder
      highlightedElement.dataset.dragHighlight = ''
      return true
    } else if (elementUnder?.parentElement?.dataset?.dragSlot) {
      if (highlightedElement) {
        delete highlightedElement.dataset.dragHighlight
      }
      highlightedElement = elementUnder.parentElement as HTMLDivElement
      highlightedElement.dataset.dragHighlight = ''
      return true
    } else if (highlightedElement) {
      delete highlightedElement.dataset.dragHighlight
      highlightedElement = null
    }
    return false
  }
  function handlePointerDown(event: PointerEvent): void {
    const clickTarget = event.target as HTMLDivElement
    const hasClickTargetPermision =
      clickTarget.parentElement?.dataset.dragHandle === '' || clickTarget?.dataset.dragHandle === ''

    if (!hasClickTargetPermision) {
      return
    }

    const target = event.currentTarget as HTMLDivElement
    const startX = event.clientX
    const startY = event.clientY
    target.style.pointerEvents = 'none'
    target.style.touchAction = 'none'
    clickTarget.style.touchAction = 'none'
    clickTarget.style.pointerEvents = 'none'
    target.style.transition = ''

    // Начальные координаты элемента
    const rect = target.getBoundingClientRect()
    const innerX = startX - rect.left
    const innerY = startY - rect.top

    const offsetX = startX - rect.left + rect.left
    const offsetY = startY - rect.top + rect.top
    if (target.dataset.dragItem) {
      dragItem.value = target.dataset.dragItem
    }
    const rootScrollHeight = rootElement?.scrollHeight ?? 0
    const rootScrollWidth = rootElement?.scrollWidth ?? 0
    const rootClientHeight = rootElement?.clientHeight ?? 0

    let scrollFactorX = 0
    let scrollFactorY = 0
    // const checkScroll = autoScroll(rootElement, target)
    const onPointerMove = (moveEvent: PointerEvent | TouchEvent): void => {
      moveEvent.preventDefault()
      clearInterval(scrollTimer)

      const clientX = isTouchEvent(moveEvent) ? moveEvent.touches[0].clientX : moveEvent.clientX
      const clientY = isTouchEvent(moveEvent) ? moveEvent.touches[0].clientY : moveEvent.clientY
      const moveX = clientX - offsetX + scrollFactorX
      const moveY = clientY - offsetY + scrollFactorY

      if (rootElement) {
        const rectToEdge = getDistanceToElementEdge(target, rootElement)

        if (rectToEdge.top < 30) {
          scrollTimer = setInterval(() => {
            if (rootElement && rootElement.scrollTop > 0) {
              scrollFactorY -= SCROLL_SPEED

              const _moveY = clientY - offsetY + scrollFactorY
              target.style.transform = `translate3d(${moveX}px, ${_moveY}px, 0)`
              rootElement.scrollTop -= SCROLL_SPEED
            }
          }, 16)
        } else if (rectToEdge.bottom < 30) {
          scrollTimer = setInterval(() => {
            if (rootElement && rootElement.scrollTop + rootClientHeight < rootScrollHeight) {
              scrollFactorY += SCROLL_SPEED

              const _moveY = clientY - offsetY + scrollFactorY
              target.style.transform = `translate3d(${moveX}px, ${_moveY}px, 0)`
              rootElement.scrollTop += SCROLL_SPEED
            }
          }, 16)
        } else if (rectToEdge.left < 30) {
          scrollTimer = setInterval(() => {
            if (rootElement && rootElement.scrollLeft > 0) {
              scrollFactorX -= SCROLL_SPEED

              const _moveX = clientX - offsetX + scrollFactorX
              target.style.transform = `translate3d(${_moveX}px, ${moveY}px, 0)`
              rootElement.scrollLeft -= SCROLL_SPEED
            }
          }, 16)
        } else if (rectToEdge.right < 30) {
          scrollTimer = setInterval(() => {
            if (rootElement && rootElement.scrollLeft < rootScrollWidth) {
              scrollFactorX += SCROLL_SPEED
              const _moveX = clientX - offsetX + scrollFactorX
              target.style.transform = `translate3d(${_moveX}px, ${moveY}px, 0)`
              rootElement.scrollLeft += SCROLL_SPEED
            }
          }, 16)
        }
      }

      target.style.visibility = 'hidden'
      const GAP = -10
      const unLeftTop = document.elementFromPoint(
        clientX - innerX + GAP,
        clientY - innerY + GAP,
      ) as HTMLDivElement | null
      const unCenterTop = document.elementFromPoint(
        clientX - innerX + rect.width / 2,
        clientY - innerY,
      ) as HTMLDivElement | null
      const unRightTop = document.elementFromPoint(
        clientX - innerX + rect.width + GAP,
        clientY - innerY + GAP,
      ) as HTMLDivElement | null
      const unLeftMiddle = document.elementFromPoint(
        clientX - innerX,
        clientY - innerY + rect.height / 2,
      ) as HTMLDivElement | null
      const unRightMiddle = document.elementFromPoint(
        clientX - innerX + rect.width,
        clientY - innerY + rect.height / 2,
      ) as HTMLDivElement | null
      const unLeftBottom = document.elementFromPoint(
        clientX - innerX + GAP,
        clientY - innerY + rect.height + GAP,
      ) as HTMLDivElement | null
      const unCenterBottom = document.elementFromPoint(
        clientX - innerX + rect.width / 2,
        clientY - innerY + rect.height,
      ) as HTMLDivElement | null
      const unRightBottom = document.elementFromPoint(
        clientX - innerX + rect.width + GAP,
        clientY - innerY + rect.height + GAP,
      ) as HTMLDivElement | null

      target.style.visibility = ''
      const under = [
        unCenterTop,
        unCenterBottom,
        unLeftTop,
        unRightTop,
        unLeftMiddle,
        unRightMiddle,
        unLeftBottom,
        unRightBottom,
      ]
      under.some((element): boolean => {
        return highlight(element)
      })

      target.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`
    }

    const onPointerUp = (): void => {
      clearInterval(scrollTimer)

      target.style.transition = `transform 0.3s cubic-bezier(.47,1.64,0.7,1)`
      target.style.transform = `translate3d(0px, 0px, 0)`
      target.style.pointerEvents = ''
      target.style.touchAction = ''
      clickTarget.style.touchAction = ''
      clickTarget.style.pointerEvents = ''
      const transitionSingal = new AbortController()
      target.addEventListener(
        'transitionend',
        () => {
          target.style.transition = ''
        },
        { signal: transitionSingal.signal },
      )

      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('touchmove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)

      if (highlightedElement && dragItem.value) {
        payload?.onDragEnd?.({ item: dragItem.value, slot: String(highlightedElement.dataset.dragSlot) })
        delete highlightedElement.dataset.dragHighlight
        highlightedElement = null
      }

      dragItem.value = null
    }

    if (isTouchDevice()) {
      window.addEventListener('touchmove', onPointerMove, { passive: false, signal: controller?.signal })
    } else {
      window.addEventListener('pointermove', onPointerMove, { signal: controller?.signal })
    }
    window.addEventListener('pointerup', onPointerUp, { signal: controller?.signal })
  }

  function install(node: Element | null | undefined): void {
    if (controller) {
      controller.abort('Reinstall')
      controller = new AbortController()
    }
    if (node) {
      rootElement = node
      const items = node.querySelectorAll('[data-drag-item]') as unknown as HTMLDivElement[]
      items.forEach((item) => {
        item.addEventListener('pointerdown', handlePointerDown, {
          passive: false,
          signal: controller?.signal,
        })
        item.addEventListener('contextmenu', (e) => e.preventDefault(), {
          passive: false,
          signal: controller?.signal,
        })

        const target = item.querySelector('div[data-drag-handle]')
        target?.addEventListener('touchstart', (e) => e.preventDefault(), {
          passive: false,
          signal: controller?.signal,
        })
      })
    }
  }

  onBeforeUnmount(() => {
    controller?.abort('Component unmount')
  })
  return { dragging, dragItem, install }
}
