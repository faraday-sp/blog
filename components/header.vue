<template>
  <header :class="$style.header">
    <div :class="$style.logoContainer">
      <NuxtLink to="/" :class="$style.logoLink">
        <img
            src="/static-media-frontend/pliant/logo.svg"
            alt="Logo"
        />
      </NuxtLink>
    </div>

    <div :class="$style.searchContainer">
      <UInput
          :model-value="search"
          icon="i-heroicons-magnifying-glass-20-solid"
          size="md"
          color="white"
          :trailing="false"
          placeholder="Search Comics, Tags, Authors..."
          @input="onInput"
      />
      <button
          v-if="search"
          @click="clearSearch"
          :class="$style.clearSearchButton"
      >
        ✕
      </button>
    </div>

    <UButton color="gray" variant="solid" :class="$style.aboutButton">
      About
    </UButton>
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
.header {
  background-color: #000;
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
  --tw-ring-color: #2B2B2B !important;
  background-color: #171717 !important;
  &:hover {
    background-color: #232323 !important;
  }
}

.aboutButton {
  border-radius: 10px;
  --tw-ring-color: #2B2B2B !important;
  width: 98px;
  height: 36px;
  text-align: center;
  justify-content: center;
  background-color: #171717 !important;
  &:hover {
    background-color: #232323 !important;
  }
}
</style>
