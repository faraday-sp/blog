<template>
  <div class="flex items-center gap-1 w-full">
    <template v-if="!hideButton">
      <UButton
        icon="i-heroicons-minus"
        square
        color="gray"
        variant="soft"
        :size="props.size"
        @click.prevent
        @contextmenu.prevent
        @touchstart.prevent
        @pointerdown.prevent="handleMinusStart"
        @pointerup.prevent="handleMinusEnd"
        @pointerleave.prevent="handleMinusEnd"
      />
    </template>
    <UInput
      ref="inputRef"
      :autofocus="autofocus"
      :autofocusDelay="autofocusDelay"
      :size="props.size"
      :icon="props.icon"
      inputmode="numeric"
      class="w-full text-center"
      :modelValue="innerValue"
      :ui="inputUI"
      :color="hasError ? 'red' : 'gray'"
      @keydown="handleKeydown"
      @blur="handleBlur"
      @focus="props.onFocus"
      @update:modelValue="handleInput"
    >
      <template
        v-if="!props.icon"
        #leading
      >
        <span class="text-sm font-medium">{{ props.leading }}</span>
      </template>
    </UInput>
    <UButton
      v-if="!hideButton"
      icon="i-heroicons-plus"
      square
      color="gray"
      variant="soft"
      :size="props.size"
      @click.prevent
      @contextmenu.prevent
      @touchstart.prevent
      @pointerdown.prevent="handlePlusStart"
      @pointerup.prevent="handlePlusEnd"
      @pointerleave.prevent="handlePlusEnd"
    />
  </div>
</template>

<script lang="ts" setup>
  import type { UInput } from '#build/components'

  const props = withDefaults(
    defineProps<{
      autofocus?: boolean
      autofocusDelay?: number
      denominator?: number
      hideButton?: boolean
      icon?: string
      leading?: string
      max: number
      min: number
      onBlur?: () => void
      onClickMinus?: () => void
      onClickPlus?: () => void
      onFocus?: () => void
      onInput: (value: number) => void
      size?: 'md' | 'sm' | 'xs'
      step?: number
      value: number
    }>(),
    {
      autofocus: false,
      autofocusDelay: undefined,
      denominator: 2,
      hideButton: false,
      icon: undefined,
      leading: '',
      onBlur: () => undefined,
      onClickMinus: () => undefined,
      onClickPlus: () => undefined,
      onFocus: () => undefined,
      size: 'sm',
      step: 1,
    },
  )
  const innerValue = ref(String(props.value))
  const inputRef = ref<InstanceType<typeof UInput>>()
  function decrement(): void {
    if (Number(innerValue.value) < props.min) {
      props.onInput(props.min)
      innerValue.value = String(props.min)
      return
    }

    if (props.value - props.step >= props.min) {
      props.onInput(props.value - props.step)
      innerValue.value = String(props.value - props.step)
    }
  }
  function handleMinusEnd(): void {
    // clearInterval(timer)
  }

  function handleMinusStart(): void {
    decrement()
    props.onClickMinus()
  }
  function handlePlusEnd(): void {
    // clearInterval(timer)
  }

  // let timer: NodeJS.Timeout | number = 0
  function handlePlusStart(): void {
    increment()
    props.onClickPlus()
  }
  function increment(): void {
    if (Number(innerValue.value) > props.max) {
      props.onInput(props.max)
      innerValue.value = String(props.max)
      return
    }
    if (props.value + props.step <= props.max) {
      props.onInput(props.value + props.step)
      innerValue.value = String(props.value + props.step)
    }
  }
  const inputUI = computed(() => {
    return {
      base: `${props.hideButton ? 'text-right' : 'text-center'}`,
      color: {
        gray: {
          outline:
            'shadow-sm dark:bg-transparent text-gray-900 dark:text-white ring-1 ring-inset ring-transparent dark:ring-transparent focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
        },
      },
      leading: {
        padding: {
          md: 'ps-3',
          sm: 'ps-2',
          xs: 'ps-1',
        },
      },
      padding: {
        '2xs': 'px-2 py-1',
        lg: 'px-3.5 py-2.5',
        md: 'px-3 py-2',
        sm: 'px-2.5 py-1.5',
        xl: 'px-3.5 py-2.5',
        xs: 'px-1 py-1.5',
      },
      trailing: {
        padding: {
          md: 'ps-2',
          sm: 'ps-2',
          xs: 'ps-1',
        },
      },
      wrapper: `rounded-md`,
    }
  })
  function handleBlur(event: FocusEvent): void {
    requestAnimationFrame(() => {
      props.onBlur()
    })
    const nextValue = Number((event.target as HTMLInputElement)?.value)

    if (Number.isNaN(nextValue) && inputRef.value?.input) {
      inputRef.value.input.value = String(props.value)
      innerValue.value = String(props.value)
      return
    }
    if (nextValue < props.min) {
      props.onInput(props.min)
      innerValue.value = String(props.min)
      return
    }
    if (nextValue > props.max) {
      props.onInput(props.max)
      innerValue.value = String(props.max)
      return
    }

    innerValue.value = String(subFloat(nextValue, props.denominator))
    props.onInput(subFloat(nextValue, props.denominator))
  }
  function handleInput(value: string): void {
    if (!inputRef.value?.input) {
      return
    }
    const nextValue = Number(value)

    if (Number.isNaN(nextValue)) {
      inputRef.value.input.value = String(props.value)
      innerValue.value = String(props.value)
      return
    }

    innerValue.value = value

    if (nextValue >= props.min && nextValue <= props.max) {
      props.onInput(nextValue)
    }
  }
  function handleKeydown(event: KeyboardEvent): void {
    if (event.code === 'Enter') {
      inputRef.value?.input.blur()
    }
    if (event.code === 'ArrowDown') {
      decrement()
    }
    if (event.code === 'ArrowUp') {
      increment()
    }
  }
  const hasError = computed(() => {
    if (Number(innerValue.value) > props.max || Number(innerValue.value) < props.min) {
      return true
    }
    return false
  })

  watch(
    () => props.value,
    () => {
      innerValue.value = String(props.value)
    },
  )
</script>
