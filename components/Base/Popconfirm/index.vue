<template>
  <UPopover
    v-model:open="popover"
    :popper="{
      arrow: true,
      placement: 'bottom-end',
      strategy: 'absolute',
    }"
  >
    <slot />

    <template #panel>
      <div class="z-100 p-2 max-w-64 w-max">
        <h4 class="text-sm mb-1.5 font-bold leading-none">
          {{ te(props.title) ? t(props.title) : props.title }}
        </h4>
        <p
          v-if="props.message"
          class="text-xs block"
        >
          {{ te(props.message) ? t(props.message) : props.message }}
        </p>
        <div class="flex gap-1 mt-0.5 justify-end">
          <UButton
            variant="soft"
            color="gray"
            @click="cancel"
          >
            Cancel
          </UButton>
          <UButton
            variant="soft"
            @click="confirm"
          >
            OK
          </UButton>
        </div>
      </div>
    </template>
  </UPopover>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      message?: string
      onCancel?: () => void
      onConfirm?: () => void
      title: string
    }>(),
    {
      message: '',
      onCancel: () => undefined,
      onConfirm: () => undefined,
    },
  )
  const { t, te } = useLocale()
  const popover = ref(false)
  function cancel(): void {
    popover.value = false
    props.onCancel()
  }
  function confirm(): void {
    popover.value = false
    props.onConfirm()
  }

  function open(): void {
    popover.value = true
  }
  defineExpose({ open })
</script>
