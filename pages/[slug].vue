<template>
  <article class="text-white bg-black">
    <ContentDoc :path="`/posts/${slug}`" v-slot="{ doc }">
      <div class="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img
            v-if="doc.thumbnail"
            :src="doc.thumbnail"
            :alt="doc.title"
            class="absolute inset-0 w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/70"></div>
        <div class="relative text-center px-4">
          <h1 class="text-4xl font-bold mb-2 text-white">
            {{ doc.title }}
          </h1>
          <p class="text-sm text-white/70">
            {{ formatDate(doc.date) }}
          </p>
          <div v-if="doc.tags" class="mt-4 space-x-2">
            <span
                v-for="(tag, i) in doc.tags"
                :key="i"
                class="inline-block bg-neutral-700 text-xs text-white px-2 py-1 rounded-md"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
      <div class="mx-auto px-4 py-8 leading-relaxed prose prose-invert">
        <ContentRenderer :value="doc" />
      </div>
    </ContentDoc>
  </article>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const { slug } = useRoute().params;

function formatDate(dateStr: string) {
  const dateObj = new Date(dateStr);
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const dd = String(dateObj.getDate()).padStart(2, "0");
  const yyyy = dateObj.getFullYear();
  return `${mm}.${dd}.${yyyy}`;
}
</script>
