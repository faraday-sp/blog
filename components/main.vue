<template>
  <main :class="[$style.main, ...props.cl]">
    <NuxtPage :search="search" />
  </main>
</template>

<script setup lang="ts">
  const props = defineProps<{
    cl: PropsCl[]
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
