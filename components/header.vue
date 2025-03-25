<template>
  <header
    :class="[...props.cl]"
    class="sticky top-0 flex w-full py-3 px-3 mb:px-3 mb:py-2 border-b border-gray-700/50 bg-natural-900/80 backdrop-blur-md backdrop-saturate-150 z-50 transition-transform ease-in-out"
    style="transition-duration: 400ms"
  >
    <div
      :class="$style.base"
      class="absolute -translate-x-1/2 max-mb:hidden flex"
      :style="{
        left: 'calc(50% + 36px)',
      }"
    >
      <UInput
        :modelValue="search"
        placeholder="Search Comics, Tags, Autors..."
        class="w-full"
        color="neutral"
        variant="outline"
        leadingIcon="i-solar-rounded-magnifer-outline"
        @input="onInput"
      />
    </div>
    <nav class="flex place-items-center justify-between w-full gap-4 mb:gap-0">
      <div class="flex items-center gap-4">
        <NuxtLink
          to="/"
          :cl="['transition-transform duration-300 active:scale-95 flex rounded-md w-fit']"
        >
          <BaseImg
            src="logo.svg"
            class="min-w-36 w-36 mb:min-w-32 mb:w-32"
          />
        </NuxtLink>
      </div>
      <div class="flex gap-2 mb:gap-1.5">
        <UButton
          color="neutral"
          variant="solid"
          :class="$style.aboutButton"
        >
          About
        </UButton>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
  import { defineEmits, defineProps } from 'vue'

  const props = defineProps<{
    cl: PropsCl[]
    search: string
  }>()

  const emits = defineEmits<{
    (event: 'update:search', newVal: string): void
  }>()

  function onInput(event: Event): void {
    const target = event.target as HTMLInputElement
    emits('update:search', target.value)
  }
</script>

<style module>
  .base {
    width: 100%;
    max-width: 464px;
  }

  .searchContainer input {
    border-radius: 20px;
    height: 36px;
  }

  .aboutButton {
    width: 98px;
    height: 36px;
    text-align: center;
    justify-content: center;
    border: 1px solid #2b2b2b;
  }
</style>
