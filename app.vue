<template>
  <div class="min-h-screen flex flex-col bg-black text-white">
    <header class="bg-neutral-900 py-4 px-6 border-b border-neutral-700 flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <NuxtLink
            to="/"
            class="flex items-center space-x-4"
        >
          <img
              src="assets/logo.svg"
              alt="Logo"
              class="logo w-auto"
          />
          <h1 class="text-4xl font-bold text-white">
             BLOG
          </h1>
        </NuxtLink>
      </div>
      <div class="relative">
        <input
            v-model="search"
            type="text"
            placeholder="Search articles..."
            class="rounded-md bg-white/10 text-white px-3 py-1 pr-8
                 focus:outline-none focus:ring-2 focus:ring-green-400
                 focus:ring-offset-2 focus:ring-offset-neutral-900"
        />
        <button
            v-if="search"
            @click="search = ''"
            class="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-green-400"
        >
          ✕
        </button>
      </div>
    </header>
    <main class="flex-1 px-6 py-6">
      <NuxtPage :search="search" />
    </main>
    <footer class="bg-neutral-900 py-4 px-6 border-t border-neutral-700 text-center text-sm text-white/60">
      © {{ new Date().getFullYear() }} ONLY-NICE company. All rights reserved.
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const search = ref("");
</script>

<style>
  body {
    @apply bg-black text-white;
  }
  .logo {
    height: 28px;
  }
</style>