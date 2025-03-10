<template>
  <div
    :class="$style.base"
    :style="{
      '--listYPositionCSS': listYPositionCSS,
      '--durationCSS': durationCSS,
      '--fontSizeCSS': fontSizeCSS,
    }"
  >
    <div
      ref="listRef"
      :class="$style.list"
    >
      <div
        v-for="item in digits"
        :key="item"
        :class="[$style.digit, item === props.digit && $style.activeDigit]"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      digit: number
      duration?: number
      fontSize: number
      onTransitionEnd?: (event: TransitionEvent) => void
    }>(),
    {
      duration: 1000,
      onTransitionEnd: () => undefined,
    },
  )
  const listRef = ref()
  onMounted(() => {
    listRef.value.addEventListener('transitionend', (event: TransitionEvent) => {
      props.onTransitionEnd(event)
    })
  })

  const digits = [...Array(10).keys()]

  const fontSizeCSS = computed(() => `${props.fontSize || 0}px`)
  const listYPositionCSS = computed(() => `${-(Number(props.digit) * props.fontSize)}px`)
  const durationCSS = computed(() => `${props.duration}ms`)
</script>

<style lang="scss" module>
  .base {
    overflow: hidden;
    display: inline-flex;
    line-height: 1;
    font-size: var(--fontSizeCSS);
    height: var(--fontSizeCSS);
  }
  .list {
    text-align: center;
    transform: translateY(var(--listYPositionCSS));
    transition: transform var(--durationCSS) cubic-bezier(0.39, 1.18, 0.44, 1);
  }
  .digit {
    user-select: none;
    height: var(--fontSizeCSS);
    font-feature-settings:
      'tnum' on,
      'lnum' on;
  }
  .activeDigit {
    user-select: auto;
  }
</style>
