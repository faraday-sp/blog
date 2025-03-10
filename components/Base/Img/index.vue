<template>
  <img
    ref="root"
    :src="initSrc"
    :class="[...props.cl]"
    :alt="alt || props.src"
    :loading="props.priority ? 'eager' : 'lazy'"
    @error="handleError"
    @load="props.onLoad"
  />
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      alt?: string
      cl?: PropsCl[]
      onLoad?: () => void
      priority?: boolean
      src: ImgName
    }>(),
    {
      alt: '',
      cl: () => [],
      onLoad: () => undefined,
      priority: false,
    },
  )
  const root = ref<HTMLImageElement | null>(null)
  const initSrc = ref('')

  watch(
    [() => props.src],
    () => {
      const type = `pliant`

      const src = `/static-media-frontend/${type}/${props.src}`
      if (root.value) {
        root.value.src = src
      } else {
        initSrc.value = src
      }
    },
    {
      immediate: true,
    },
  )
  function handleError(event: Event): void {
    const pliantKey = `/static-media-frontend/pliant/logo-sign-dev.svg`

    const target = event.target as HTMLImageElement
    target.src = pliantKey
  }
</script>
