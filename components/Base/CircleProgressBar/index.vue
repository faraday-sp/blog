<template>
  <div class="relative w-fit">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex leading-none">
      <slot></slot>
    </div>
    <div style="transform: rotateY(180deg)">
      <svg
        class="relative -rotate-90"
        fill="none"
        :height="`${size}px`"
        :width="`${size}px`"
      >
        <circle
          :cx="`${center}px`"
          :cy="`${center}px`"
          :r="`${radius}px`"
          :stroke="backgroundColor"
          :stroke-width="`${strokeWidth}px`"
        />
        <circle
          class="transition-all"
          :cx="`${center}px`"
          :cy="`${center}px`"
          :r="`${radius}px`"
          :stroke="props.color"
          :stroke-dasharray="`${circumference}px`"
          :stroke-dashoffset="`${progressOffset}px`"
          :stroke-width="`${strokeWidth}px`"
          stroke-linecap="round"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      backgroundColor?: string
      color?: string
      percentage?: number
      size?: number
      strokeWidth?: number
    }>(),
    {
      backgroundColor: 'blue',
      color: 'red',
      percentage: 40,
      size: 30,
      strokeWidth: 4,
    },
  )

  const center = computed(() => props.size / 2)
  const radius = computed(() => center.value - props.strokeWidth)
  const circumference = computed(() => radius.value * 2 * Math.PI)
  const progressOffset = computed(() => circumference.value * (1 - props.percentage / 100))
</script>
