<template>
  <div ref="observerRef" />
  <slot
    v-if="props.offset < total"
    name="loader"
  />
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      increment?: number
      offset: number
      onUpdateOffset?: (total: number) => void
      optionList?: IntersectionObserverInit
      total: number
    }>(),
    {
      increment: 1,
      onUpdateOffset: () => undefined,
      optionList: () => ({}),
    },
  )

  const observerRef = ref<Element | null>(null)
  let observer: IntersectionObserver

  const refresh = (): void => {
    if (observer && observerRef?.value) {
      observer.unobserve(observerRef.value)
      observer.observe(observerRef.value)
    }
  }

  const intersect = (): void => {
    const currentOffset = props.offset + props.increment
    props.onUpdateOffset(currentOffset)
    nextTick(() => {
      if (currentOffset < props.total) {
        refresh()
      }
    })
    setTimeout(() => {
      //refresh()
    }, 500)
  }

  onMounted(() => {
    try {
      observer = new IntersectionObserver(([entry]) => {
        if (entry && entry.isIntersecting) {
          intersect()
        }
      }, props.optionList)

      if (observerRef.value) {
        observer.observe(observerRef.value)
      }
    } catch {
      observer.disconnect()
      props.onUpdateOffset(props.total)
    }
  })

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect()
    }
  })
</script>
