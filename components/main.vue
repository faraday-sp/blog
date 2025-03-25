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

<style module>
  .main {
    padding: 24px;
  }

  @media (max-width: 640px) {
    .main {
      padding: 16px;
    }
  }
</style>
