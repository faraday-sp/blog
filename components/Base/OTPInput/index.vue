<template>
  <div :class="style.base">
    <input
      v-for="index in props.length"
      :key="index"
      ref="inputRefList"
      :class="style.input"
      autocomplete="one-time-code"
      inputmode="numeric"
      maxlength="1"
      type="text"
      @keydown="handleKeydown"
      @keyup="handleKeyup"
      @input="handleInput"
      @paste="handlePaste"
      @click="handleClick"
    />
  </div>
</template>

<script lang="ts" setup>
  import style from './style.module.scss'

  const props = withDefaults(
    defineProps<{
      length?: number
      onInput?: (value: string) => void
    }>(),
    {
      length: 4,
      onInput: () => undefined,
    },
  )
  const inputRefList = ref<HTMLInputElement[]>()
  function handleClick(event: MouseEvent): void {
    const target = event.target as HTMLInputElement
    target.select()
  }
  function handleInput(): void {
    let result = ''
    if (inputRefList.value) {
      for (const input of inputRefList.value) {
        result += input.value
      }
    }
    props.onInput(result)
  }
  function handleKeydown(event: KeyboardEvent): void {
    if (
      isNumber(Number(event.key)) ||
      event.key === 'Backspace' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      (event.code === 'KeyV' && event.metaKey)
    ) {
      return
    }
    event.preventDefault()
  }
  function handleKeyup(event: KeyboardEvent): void {
    if (event.key === 'Backspace') {
      if (inputRefList.value) {
        for (const index in inputRefList.value) {
          const input = inputRefList.value[index]
          if (event.target === input && Number(index) !== 0) {
            inputRefList.value[Number(index) - 1].focus()
            return
          }
        }
      }
      return
    }
    if (inputRefList.value) {
      for (const index in inputRefList.value) {
        const input = inputRefList.value[index]
        if (input.value === '') {
          input.focus()
          return
        }
        if (event.target === input && Number(index) !== inputRefList.value.length - 1) {
          inputRefList.value[Number(index) + 1].select()
          return
        }
        input.blur()
      }
    }
  }
  function handlePaste(event: ClipboardEvent): void {
    const dataClipboard = parseInt(event.clipboardData?.getData('Text') || '')
    if (Number.isNaN(dataClipboard)) {
      event.preventDefault()
      return
    }
    for (const index in dataClipboard.toString().split('')) {
      const num = dataClipboard.toString().split('')[index]
      if (inputRefList.value && inputRefList.value[index]) {
        inputRefList.value[index].value = num
      }
    }
  }

  onMounted(() => {
    if (inputRefList.value) {
      const input = inputRefList.value[0]
      input.focus()
    }
  })
</script>
