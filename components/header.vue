<template>
  <header
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
          :model-value="search"
          placeholder="Search Comics, Tags, Autors..."
          class="w-full"
          :ui="{
            trailingIcon: 'rounded-full',
          }"
          color="neutral"
          variant="outline"
          size="md"
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
        <UButton color="neutral" variant="solid" :class="$style.aboutButton">
          About
        </UButton>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  search: string
}>()

const emits = defineEmits<{
  (event: 'update:search', newVal: string): void
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emits('update:search', target.value)
}

function clearSearch() {
  emits('update:search', '')
}
</script>

<style lang="scss" module>
.base {
  width: 100%;
  max-width: 464px;
}

.header {
  background-color: #171717;
  border-bottom: 1px solid #2b2b2b;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include mobile {
    padding: 16px;
  }
}

.logoContainer {
  display: flex;
  align-items: center;
}

.logoLink {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
}

.searchContainer {
  position: relative;
  width: 100%;
  max-width: 400px;
  @include mobile {
    display: none;
  }
}

.clearSearchButton {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;

  &:hover {
    color: #00ff99;
  }
}

.searchContainer input {
  border-radius: 20px;
  height: 36px;
  //--tw-ring-color: #2B2B2B !important;
  //background-color: #171717 !important;
  //&:hover {
  //  background-color: #232323 !important;
  //}
}

.aboutButton {
  //--tw-ring-color: #2B2B2B !important;
  width: 98px;
  height: 36px;
  text-align: center;
  justify-content: center;
  //background-color: #171717 !important;
  //&:hover {
  //  background-color: #232323 !important;
  //}
}
</style>
