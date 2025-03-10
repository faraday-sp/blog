<template>
  <form @submit.prevent="handleSubmit">
    <slot />
  </form>
</template>

<script lang="ts" setup>
  import { formProvide } from '@/core/constants'

  const props = withDefaults(
    defineProps<{
      onSubmit?: () => void
    }>(),
    {
      onSubmit: () => undefined,
    },
  )
  const eventList: Record<string, () => boolean> = {}
  function mountInput(handler: () => boolean, key: string): void {
    eventList[key] = handler
  }
  function unmountInput(key: string): void {
    delete eventList[key]
  }
  provide(formProvide.mount, mountInput)
  provide(formProvide.unmount, unmountInput)
  function handleSubmit(): void {
    for (const handler of Object.values(eventList)) {
      if (!handler()) {
        return
      }
    }

    props.onSubmit()
  }
  defineExpose({ submit: handleSubmit })
</script>
