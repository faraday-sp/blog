<template>
  <Transition
    @beforeEnter="beforeStart"
    @enter="start"
    @afterEnter="afterEnter"
    @beforeLeave="beforeLeave"
    @leave="leave"
    @afterLeave="afterLeave"
  >
    <slot></slot>
  </Transition>
</template>

<script lang="ts" setup>
  import style from './style.module.scss'
  const props = withDefaults(
    defineProps<{
      duration?: number
    }>(),
    {
      duration: 300,
    },
  )
  const beforeStart = (event: Element): void => {
    const el = event as HTMLElement
    el.classList.add(style.expand)
    el.style.transitionDuration = `${props.duration}ms`

    el.style.height = '0'
  }
  const start = (event: Element): void => {
    const el = event as HTMLElement
    el.dataset.oldOverflow = el.style.overflow

    if (el.scrollHeight === 0) {
      el.style.height = ''
    } else {
      el.style.height = `${el.scrollHeight}px`
    }

    el.style.overflow = 'hidden'
  }
  const afterEnter = (event: Element): void => {
    const el = event as HTMLElement
    el.classList.remove(style.expand)
    el.style.transitionDuration = ''
    el.style.height = ''
    el.style.overflow = String(el.dataset.oldOverflow)
  }
  const beforeLeave = (event: Element): void => {
    const el = event as HTMLElement
    const computedStyle = getComputedStyle(el)
    el.dataset.oldOverflow = computedStyle.overflow

    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  }
  const leave = (event: Element): void => {
    const el = event as HTMLElement
    if (el.scrollHeight !== 0) {
      // for safari: add class after set height, or it will jump to zero height suddenly, weired
      el.classList.add(style.expand)
      el.style.transitionDuration = `${props.duration}ms`
      el.style.height = '0'
    }
  }
  const afterLeave = (event: Element): void => {
    const el = event as HTMLElement

    el.classList.add(style.expand)
    el.style.transitionDuration = ''
    el.style.height = ''
    el.style.overflow = String(el.dataset.oldOverflow)
  }
</script>
