<template>
  <div class="min-h-screen flex flex-col bg-black text-white">
    <Header
        :search="search"
        @update:search="(val: string) => search = val"
    />

    <Main :search="search" />

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const search = ref('')
</script>

<style>
body {
  background: #171717;
}
</style>