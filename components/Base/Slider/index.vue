<template>
  <div
    ref="sliderRef"
    :class="[
      style.base,
      modClass,
      props.loop && style.loop,
      props.disabledPointerEvents && style.disabledPointerEvents,
      ...props.cl,
      props.disableAutoplayAfterInteract && isInteracted && style.interacted,
    ]"
  >
    <div
      v-show="sliderSlideList.length > 0"
      ref="slideListRef"
      :class="[style.slideList, !isMounted && style.unmounted, props.wrapMobile && style.wrapedMobile]"
      :style="[
        slidesStyle,
        {
          transition: cssTransition,
          '--base-slider-gap': cssGap,
          '--base-slider-virtual-transform': virtualSlidesTransform,
          '--base-slider-slide-width': totalSlideWidth,
          '--base-slider-slide-width-mobile': totalSlideWidthMobile,
        },
      ]"
    >
      <div
        v-for="(slide, index) in virtualSlideList"
        :key="getSlideKey(index)"
        :class="[style.slide, isSlideActive(index) && style.slideActive, multiRowCount > 1 && style.slideMultiRow]"
      >
        <slot
          v-for="(item, i) in slide"
          :key="i"
          name="slide"
          :slide="item"
        />
      </div>
    </div>
    <slot
      v-if="sliderSlideList.length === 0"
      name="empty"
    />

    <Transition
      v-if="props.dots"
      name="poof-fast"
      mode="out-in"
    >
      <div
        v-if="sliderSlideList.length > 0"
        :class="style.dotWrapper"
      >
        <template v-if="sliderSlideList.length > 1">
          <div
            v-for="(_, index) in sliderSlideList"
            :key="index"
            :class="[
              style.dot,
              {
                [style.dotActive]: index === totalCurrentFirstIndex,
                [style.dotActiveLine]: !hideDotsProgress && index === totalCurrentFirstIndex,
                [style.dotElapsed]: !hideDotsProgress && index < totalCurrentFirstIndex,
              },
            ]"
            @click="() => handleDotClick(index)"
          ></div>
        </template>
      </div>
      <div
        v-else
        :class="style.dotWrapper"
      >
        <BaseSkeleton :cl="[style.dot]" />
        <BaseSkeleton :cl="[style.dot]" />
        <BaseSkeleton :cl="[style.dot]" />
        <BaseSkeleton :cl="[style.dot]" />
        <BaseSkeleton :cl="[style.dot]" />
        <BaseSkeleton :cl="[style.dot]" />
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup generic="T">
  interface Point {
    x: number
    y: number
  }

  const props = withDefaults(
    defineProps<{
      autoplay?: number
      cl?: PropsCl[]
      defaultIndex?: number
      disableAutoplayAfterInteract?: boolean
      disabledPointerEvents?: boolean
      dots?: boolean
      gap?: number
      hideDotsProgress?: boolean
      isMobileSlideOverlap?: boolean
      lastSlideFullWidth?: boolean
      loop?: boolean
      mod?: ('mainPageDots' | 'smallDots')[]
      multiRowCount?: number
      onPointerMoveLeft?: () => void
      onPointerMoveRight?: () => void
      slideList: T[]
      slideMinWidth?: null | number
      slideMinWidthMobile?: null | number
      virtual?: boolean
      virtualOverflowAmount?: number
      visibleCount?: number
      wrapMobile?: boolean
    }>(),
    {
      autoplay: 0,
      cl: () => [],
      defaultIndex: 0,
      disableAutoplayAfterInteract: false,
      disabledPointerEvents: false,
      dots: false,
      gap: 0,
      hideDotsProgress: false,
      isMobileSlideOverlap: false,
      lastSlideFullWidth: false,
      loop: false,
      mod: () => [],
      multiRowCount: 1,
      onPointerMoveLeft: () => undefined,
      onPointerMoveRight: () => undefined,
      slideMinWidth: null,
      slideMinWidthMobile: null,
      virtual: false,
      virtualOverflowAmount: 1,
      visibleCount: 1,
      wrapMobile: false,
    },
  )

  enum Direction {
    Left = 'left',
    Right = 'right',
  }

  const style = useCssModule()
  const { isMobile } = useScreen()
  const sliderRef = ref<HTMLDivElement | null>(null)
  const slideListRef = ref<HTMLDivElement | null>(null)
  const autoplayTimer = ref()
  const disableClick = ref(false)
  const currentFirstIndex = ref(0)
  const gestureAdditiveIndex = ref(0)
  const currentLoopIndex = ref(0)
  const sliderWidth = ref(1300)
  const rafPending = ref(false)
  const initialTouchPos = ref<null | Point>(null)
  const lastTouchPos = ref<null | Point>(null)
  const currentXPosition = ref(0)
  const isTransition = ref(true)
  const isDragged = ref(false)
  const isInteracted = ref(false)
  const isMounted = ref(false)
  const slidesStyle = reactive({
    transform: 'none',
  })
  const OVERLAP_SHRINK = 0.9
  let resizeObserver: null | ResizeObserver = null

  const modClass = computed(() => props.mod.map((type) => style[type]))

  const isVirtual = computed(() => props.virtual || props.loop)
  const virtualOverflowAmount = computed(() => {
    if (isMounted.value) {
      return props.virtualOverflowAmount
    }
    return props.loop ? 1 : 0
  })
  const slideMinWidth = computed(() => {
    return isMobile.value ? props.slideMinWidthMobile || props.slideMinWidth : props.slideMinWidth
  })
  const totalVisibleSlides = computed(() => {
    let visibleCount = props.visibleCount
    if (slideMinWidth.value !== null) {
      visibleCount = Math.floor(sliderWidth.value / slideMinWidth.value)
      const gapsWidth = props.gap * (visibleCount - 1)
      if (sliderWidth.value - slideMinWidth.value * visibleCount < gapsWidth) {
        visibleCount -= 1
      }
    }

    return Math.max(Math.ceil(visibleCount / props.multiRowCount), Math.max(1, visibleCount))
  })
  const sliderSlideList = computed(() => {
    if (props.multiRowCount > 1) {
      const rowCount = Math.min(props.multiRowCount, Math.ceil(props.slideList.length / totalVisibleSlides.value))
      const slideCount = Math.max(totalVisibleSlides.value, Math.ceil(props.slideList.length / rowCount))
      return Array.from({ length: slideCount }, (_, slideIndex) => {
        const result = []
        const visibleAdditive = Math.floor(slideIndex / totalVisibleSlides.value) * totalVisibleSlides.value
        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
          let index = slideIndex * rowCount + rowIndex
          if (slideIndex < totalVisibleSlides.value) {
            index = slideIndex + visibleAdditive + rowIndex * totalVisibleSlides.value
          }
          const item = props.slideList[index]
          if (item) {
            result.push(item)
          }
        }
        return result
      })
    }
    return props.slideList.map((slide) => [slide])
  })

  const totalSlides = computed(() => sliderSlideList.value.length)
  const slideWidth = computed(() => {
    return (sliderWidth.value - props.gap * (totalVisibleSlides.value - 1)) / totalVisibleSlides.value
  })
  const totalInvisibleSlides = computed(() => {
    const total = totalSlides.value - totalVisibleSlides.value
    return total <= 0 ? 0 : total
  })

  const indexInRange = (index: number, total: number): number => {
    index %= Math.max(total, 1)
    if (index < 0) {
      index += total
    }
    return index
  }

  const maxCurrentFirstIndex = computed(() =>
    totalSlides.value > totalVisibleSlides.value ? totalSlides.value - totalVisibleSlides.value : 0,
  )
  const hasPrevSlide = computed(() => props.loop || currentFirstIndex.value >= 1)
  const hasNextSlide = computed(() => props.loop || currentFirstIndex.value < maxCurrentFirstIndex.value)

  const totalCurrentFirstIndex = computed(() => {
    return Math.max(0, Math.min(maxCurrentFirstIndex.value, currentFirstIndex.value - gestureAdditiveIndex.value))
  })
  const totalCurrentLoopIndex = computed(() => currentLoopIndex.value - gestureAdditiveIndex.value)
  const stopValue = computed(() => Number(slideWidth.value) * 0.25)

  const cssGap = computed(() => `${props.gap}px`)
  const cssTransition = computed(() => {
    if (!isTransition.value) {
      return 'none'
    }
    if (isDragged.value) {
      return 'transform 500ms cubic-bezier(0.19, 1, 0.3, 1)'
    }
    return ''
  })
  const isAdjustWidth = computed(() => {
    return isMobile.value && props.isMobileSlideOverlap
  })
  const effectiveSlideWidth = computed(() => {
    return slideWidth.value * (isAdjustWidth.value ? OVERLAP_SHRINK : 1)
  })
  const totalSlideWidth = computed(() => getTotalSlideWidth(slideMinWidth.value))
  const totalSlideWidthMobile = computed(() => {
    return getTotalSlideWidth(props.slideMinWidthMobile || props.slideMinWidth)
  })
  function getTotalSlideWidth(width: null | number): string {
    if (!isMounted.value) {
      if (width) {
        return `${width}px`
      }
      return `${100 / props.visibleCount}%`
    }
    return `${effectiveSlideWidth.value}px`
  }

  const virtualSlideList = computed(() => {
    if (
      sliderWidth.value <= 0 ||
      !(props.virtual || props.loop) ||
      (totalInvisibleSlides.value === 0 && !props.loop)
    ) {
      return sliderSlideList.value
    }
    const currentIndex = props.loop ? totalCurrentLoopIndex.value : totalCurrentFirstIndex.value
    return Array(totalVisibleSlides.value + virtualOverflowAmount.value * 2)
      .fill('')
      .map((_, index) => {
        let slideIndex = currentIndex - virtualOverflowAmount.value + index
        if (props.loop) {
          slideIndex = indexInRange(slideIndex, totalSlides.value)
        }
        return sliderSlideList.value[slideIndex]
      })
      .filter((slide) => slide !== undefined)
  })

  const xPositionByIndex = (index: number): number => {
    if (isMobile.value && props.lastSlideFullWidth && index + props.visibleCount === totalSlides.value) {
      return -(slideWidth.value * index + 32 + currentFirstIndex.value * props.gap)
    }
    return -(slideWidth.value * index + currentFirstIndex.value * props.gap)
  }
  const virtualSlidesTransform = computed(() => {
    if (!isVirtual.value || (totalInvisibleSlides.value === 0 && !props.loop)) {
      return '0px'
    }

    const currentIndex = props.loop ? totalCurrentLoopIndex.value : totalCurrentFirstIndex.value
    let slideIndex = currentIndex - virtualOverflowAmount.value
    if (!props.loop) {
      slideIndex = Math.max(0, slideIndex)
    }
    return `${slideWidth.value * slideIndex + slideIndex * props.gap}px`
  })
  const setCurrentLoopIndex = (oldIndex: number, newIndex: number, rawDifference: number = 0): void => {
    // Shortest distance to target slide
    let difference = newIndex - oldIndex
    let isOverHalf = Math.round(Math.abs(difference) / totalSlides.value) >= 0.5

    if (totalSlides.value <= 2) {
      isOverHalf = false
      difference = Math.sign(rawDifference)
    }

    currentLoopIndex.value += difference
    if (isOverHalf) {
      currentLoopIndex.value -= totalSlides.value * Math.sign(difference)
    }
  }
  const setCurrentFirstIndex = (index: number): void => {
    const rawDifference = index - currentFirstIndex.value

    if (props.loop) {
      index = indexInRange(index, totalSlides.value)
    } else if (index < 0) {
      index = 0
    } else if (index > maxCurrentFirstIndex.value) {
      index = maxCurrentFirstIndex.value
    }
    const overlapWidth =
      index !== 0 && isAdjustWidth.value ? slideWidth.value * (1 - OVERLAP_SHRINK) * (index + 1) : 0

    setCurrentLoopIndex(currentFirstIndex.value, index, rawDifference)
    currentFirstIndex.value = index
    if (props.loop) {
      currentXPosition.value = -(slideWidth.value * currentLoopIndex.value + currentLoopIndex.value * props.gap)
    } else {
      currentXPosition.value = xPositionByIndex(index)
    }
    slidesStyle.transform = `translateX(${currentXPosition.value + overlapWidth}px)`
  }

  const getSlideKey = (index: number): number => {
    if (isVirtual.value) {
      if (props.loop) {
        return index + totalCurrentLoopIndex.value
      }
      return index + Math.max(totalCurrentFirstIndex.value - virtualOverflowAmount.value, 0)
    }
    return index
  }
  const getSlideIndex = (index: number): number => {
    if (isVirtual.value) {
      if (props.loop) {
        index = totalCurrentFirstIndex.value - virtualOverflowAmount.value + index
      } else {
        index = Math.max(totalCurrentFirstIndex.value - virtualOverflowAmount.value, 0) + index
      }
    }
    return index
  }
  const isSlideActive = (index: number): boolean => {
    index = getSlideIndex(index)
    return index >= totalCurrentFirstIndex.value && index < totalCurrentFirstIndex.value + totalVisibleSlides.value
  }
  const indexBySwipeXWidth = (xPosition: number, direction: Direction): number => {
    const index = Math.ceil(Math.abs(xPosition) / (slideWidth.value + props.gap))
    return direction === Direction.Right ? index : -index
  }
  const currentIndexBySwipeXWidth = (xPosition: number, direction: Direction): number => {
    return currentFirstIndex.value + indexBySwipeXWidth(xPosition, direction)
  }
  const indexSlide = (index: number): void => {
    setCurrentFirstIndex(index)
  }
  const stopAutoplay = (): void => {
    if (autoplayTimer.value !== false) {
      clearInterval(autoplayTimer.value)
      autoplayTimer.value = false
    }
  }
  const nextSlide = (): void => {
    isInteracted.value = true
    if (!hasNextSlide.value) {
      setCurrentFirstIndex(0)
      return
    }
    setCurrentFirstIndex(currentFirstIndex.value + 1)
  }

  const prevSlide = (): void => {
    isInteracted.value = true
    if (!hasPrevSlide.value) {
      setCurrentFirstIndex(totalSlides.value)
      return
    }
    setCurrentFirstIndex(currentFirstIndex.value - 1)
  }

  const startAutoplay = (): void => {
    if (props.autoplay && props.slideList.length > 1) {
      autoplayTimer.value = setInterval(nextSlide, props.autoplay)
    }
  }
  const restartAutoplay = (): void => {
    stopAutoplay()
    if (!(props.disableAutoplayAfterInteract && isInteracted.value)) {
      startAutoplay()
    }
  }

  const handleDotClick = (index: number): void => {
    isInteracted.value = true
    if (index === currentFirstIndex.value) {
      return
    }
    indexSlide(index)
    restartAutoplay()
  }

  const handleMouseEnter = (): void => {
    stopAutoplay()
  }

  const handleMouseLeave = (): void => {
    isDragged.value = false
    if (props.autoplay) {
      restartAutoplay()
    }
  }

  const handleResize = (): void => {
    const previousWidth = sliderWidth.value
    sliderWidth.value = sliderRef.value?.offsetWidth ?? 0
    if (previousWidth !== sliderWidth.value) {
      isTransition.value = false
      setCurrentFirstIndex(props.defaultIndex)
      requestAnimationFrame(() => (isTransition.value = true))
    }
  }

  const getGesturePointFromEvent = (event: PointerEvent): Point => {
    const point = {
      x: 0,
      y: 0,
    }
    point.x = event.clientX
    point.y = event.clientY
    return point
  }
  const getGestureXDifference = (): number => {
    return initialTouchPos.value && lastTouchPos.value ? initialTouchPos.value?.x - lastTouchPos.value?.x : 0
  }

  const handleGestureStart = (event: PointerEvent): void => {
    if (props.disabledPointerEvents || props.slideList.length <= 1) {
      return
    }
    isInteracted.value = true
    const target = event.target as HTMLElement
    target.setPointerCapture(event.pointerId)
    initialTouchPos.value = getGesturePointFromEvent(event)
    lastTouchPos.value = getGesturePointFromEvent(event)
  }
  const gestureAnimationFrame = (): void => {
    if (!rafPending.value) {
      return
    }
    const differenceInX = getGestureXDifference()

    if (props.virtual) {
      gestureAdditiveIndex.value =
        currentIndexBySwipeXWidth(differenceInX, differenceInX > 0 ? Direction.Left : Direction.Right) -
        currentFirstIndex.value
    }

    let slowDifferenceInX = differenceInX
    if (
      !props.loop &&
      (currentXPosition.value - differenceInX > 0 ||
        currentXPosition.value - differenceInX < xPositionByIndex(maxCurrentFirstIndex.value))
    ) {
      slowDifferenceInX = differenceInX * 0.1
    }

    slidesStyle.transform = `translateX(${currentXPosition.value - slowDifferenceInX}px)`
    rafPending.value = false
  }
  const handleGestureMove = (event: PointerEvent): void => {
    event.preventDefault()
    isDragged.value = true
    if (!initialTouchPos.value) {
      return
    }
    if (slideListRef.value) {
      slideListRef.value.style.pointerEvents = 'none'
    }
    lastTouchPos.value = getGesturePointFromEvent(event)

    if (rafPending.value) {
      return
    }
    rafPending.value = true
    window.requestAnimationFrame(gestureAnimationFrame)
  }

  const updateSwipeRestPosition = (): void => {
    const differenceInX = getGestureXDifference()
    if (Math.abs(differenceInX) > stopValue.value) {
      if (differenceInX > 0) {
        indexSlide(currentIndexBySwipeXWidth(differenceInX, Direction.Right))
        props.onPointerMoveRight()
      } else {
        indexSlide(currentIndexBySwipeXWidth(differenceInX, Direction.Left))
        props.onPointerMoveLeft()
      }
    } else {
      setCurrentFirstIndex(currentFirstIndex.value)
    }
  }
  const handleGestureEnd = (event: PointerEvent): void => {
    event.preventDefault()
    event.stopPropagation()
    rafPending.value = false

    if (slideListRef.value) {
      slideListRef.value.style.pointerEvents = ''
    }
    const target = event.target as HTMLElement
    const point = getGesturePointFromEvent(event)
    if (point.x > 0 || point.y > 0) {
      lastTouchPos.value = point
    }
    target.releasePointerCapture(event.pointerId)

    gestureAdditiveIndex.value = 0
    updateSwipeRestPosition()

    if (Math.abs(getGestureXDifference()) > 2) {
      disableClick.value = true
      setTimeout(() => {
        disableClick.value = false
      }, 0)
    }

    initialTouchPos.value = null
  }

  onMounted(() => {
    resizeObserver = new ResizeObserver(handleResize)

    if (sliderRef.value) {
      resizeObserver?.observe(sliderRef.value)
    }
    handleResize()

    sliderRef.value?.addEventListener(
      'mouseenter',
      (e) => e.target === sliderRef.value && handleMouseEnter(),
      true,
    )
    sliderRef.value?.addEventListener(
      'mouseleave',
      (e) => e.target === sliderRef.value && handleMouseLeave(),
      true,
    )

    if (!props.disabledPointerEvents) {
      sliderRef.value?.addEventListener('pointerdown', handleGestureStart, true)
      sliderRef.value?.addEventListener('pointermove', handleGestureMove, true)
      sliderRef.value?.addEventListener('pointerup', handleGestureEnd, true)
      sliderRef.value?.addEventListener('pointercancel', handleGestureEnd, true)
    }

    if (props.autoplay) {
      startAutoplay()
    }
    isMounted.value = true
  })

  onBeforeUnmount(() => {
    stopAutoplay()

    resizeObserver?.disconnect()
    if (!props.disabledPointerEvents) {
      slideListRef.value?.removeEventListener('pointerdown', handleGestureStart, true)
      slideListRef.value?.removeEventListener('pointermove', handleGestureMove, true)
      slideListRef.value?.removeEventListener('pointerup', handleGestureEnd, true)
      slideListRef.value?.removeEventListener('pointercancel', handleGestureEnd, true)
    }
  })

  defineExpose({
    currentFirstIndex,
    disableClick,
    handleResize,
    hasNextSlide,
    hasPrevSlide,
    indexSlide,
    nextSlide,
    prevSlide,
    reset() {
      setCurrentFirstIndex(props.defaultIndex)
    },
    restartAutoplay,
    totalInvisibleSlides,
    totalSlides,
  })
</script>

<style lang="scss" module>
.base {
  width: 100%;
  overflow: var(--base-slider-overflow, hidden);
  position: relative;

  &.disabledPointerEvents {
    .slide {
      touch-action: auto;
    }
  }
}

.slideList {
  display: flex;
  column-gap: var(--base-slider-gap, 0);
  position: relative;
  left: 0;
  transition: var(--base-slider-transition, transform 800ms cubic-bezier(0.19, 1, 0.3, 1));

  &.unmounted {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--base-slider-slide-width, 0), 1fr));
    grid-template-rows: var(--base-slider-skeleton-rows, 1fr);
    grid-auto-rows: 0;
    column-gap: var(--base-slider-skeleton-gap, var(--base-slider-gap, 0));
    overflow: hidden;
    @include mobile {
      grid-template-columns: repeat(auto-fill, minmax(var(--base-slider-slide-width-mobile, 0), 1fr));
    }
  }
}

.slide {
  touch-action: pan-y;
  display: flex;
  justify-content: center;
  flex-basis: 0;
  position: relative;
  opacity: var(--base-slider-inactive-opacity, 1);
  transition: opacity 0.2s ease-in-out;
  min-width: var(--base-slider-slide-width, 0);
  transform: translateX(var(--base-slider-virtual-transform, 0));
  @include mobile {
    min-width: var(--base-slider-slide-width-mobile, 0);
  }

  .unmounted & {
    transform: none;
    overflow: hidden;
  }
  .loop .unmounted & {
    &:first-child {
      display: none;
    }
  }
}

.slideMultiRow {
  flex-direction: column;
  justify-content: flex-start;
  row-gap: var(--base-slider-gap, 0);
}

.slideActive {
  opacity: 1;
}

.dotWrapper {
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: var(--base-slide-dot-gap, 4px);
  z-index: 2;
  position: absolute;
  bottom: 12px;
  margin: 0 auto;
  display: flex;
  @include mobile {
    gap: 8px;
    bottom: 12px;
  }
}

.dot {
  width: 16px;
  height: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: 99px;
  background: var(--bg10);
  position: relative;
  overflow: hidden;
  @include mobile {
    width: 6px;
    height: 6px;
  }
}
.dotElapsed {
  background-color: var(--primary100);
}
.dotActiveLine {
  width: 40px;
  &::after {
    content: '';
    background-color: var(--primary100);
    height: 100%;
    width: 100%;
    position: absolute;
    left: -100%;
    top: 0;
    animation: progressAnimation 6.8s linear forwards;
  }
  @include mobile {
    background-color: var(--primary100);
    width: 6px;
    &::after {
      display: none;
    }
  }
}
.dotActive {
  &::after {
    content: '';
    background-color: var(--primary100);
    height: 100%;
    width: 100%;
    position: absolute;
    left: -100%;
    top: 0;
  }
  @include mobile {
    background-color: var(--primary100);
    width: 6px;
    &::after {
      display: none;
    }
  }
}
.smallDots {
  .dot {
    background: #535353;
    width: 6px;
    height: 6px;
  }
  .dotWrapper {
    position: relative;
    margin-top: 10px;
    bottom: 0;
  }
  .dotActiveLine {
    width: 6px;
    &::after {
      display: block;
    }
  }
  .dotActive {
    background-color: var(--primary100);
    &::after {
      display: block;
    }
  }
  .dotElapsed {
    background-color: var(--primary100);
  }
}

.mainPageDots {
  .dotWrapper {
    width: auto;
    background: #171717;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 40px;
    gap: 6px;
    padding: 6px;
    @include mobile {
      padding: 4px;
      border-radius: 20px;
      gap: 4px;
    }
  }
  .dot {
    background: #535353;
    width: 8px;
    height: 8px;
    @include mobile {
      width: 6px;
      height: 6px;
    }
  }
  .dotActiveLine {
    width: 22px;
    &::after {
      display: block;
    }
  }
  .dotActive {
    background-color: #fff;
    &::after {
      display: block;
    }
  }
  .dotElapsed {
    background-color: #535353;
  }
}

.interacted {
  .dotActiveLine::after {
    animation: none;
    transform: translateX(100%);
  }
}

@keyframes progressAnimation {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}
.wrapedMobile {
  @include mobile {
    flex-direction: column;
    gap: 6px;
  }
}
</style>
