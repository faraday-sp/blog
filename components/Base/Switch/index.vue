<template>
  <label :class="style.base">
    <div
      :class="[style.switch, props.value && style.active, props.disabled && style.disabled]"
      @click="props.onChange(!props.value)"
    >
      <span :class="style.roller"></span>
    </div>
    <slot />
  </label>
</template>

<script lang="ts" setup>
  import style from './style.module.scss'

  const props = withDefaults(
    defineProps<{
      disabled?: boolean
      onChange?: (checked: boolean) => void
      value: boolean
    }>(),
    {
      disabled: false,
      onChange: () => undefined,
    },
  )
</script>
