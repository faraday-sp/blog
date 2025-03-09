<template>
  <main :class="$style.main">
    <NuxtPage :search="search" />
  </main>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  search: string
}>()
</script>
<style lang="scss" module>
  .main {
    padding: 24px;
    @include mobile {
      padding: 16px;
    }
  }
</style>