<template>
  <ContentList
      path="/posts"
      fields="title,date,thumbnail,slug,tags"
      :query="{ draft: false, sort: [{ date: -1 }] }"
      v-slot="{ list }"
  >
    <template v-if="filteredBlogs(list).length > 0">
      <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
            v-for="blog in filteredBlogs(list)"
            :key="blog._path"
            :to="blog.slug"
            class="bg-white/10 rounded-2xl overflow-hidden
                 shadow hover:shadow-md transition-shadow duration-300 block
                 min-w-[170px]"
        >
          <div class="relative h-64 overflow-hidden">
            <img
                v-if="blog.thumbnail"
                :src="blog.thumbnail"
                :alt="blog.title"
                class="absolute inset-0 w-full h-full object-cover
                     transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div class="p-4 h-[120px] flex flex-col justify-between">
            <h3 class="text-xl font-bold mb-1 truncate text-white">
              {{ blog.title }}
            </h3>
            <div class="text-xs text-white/70 mb-1">
              {{ formatDate(blog.date) }}
            </div>
            <div v-if="blog.tags" class="space-x-2">
              <span
                  v-for="(tag, index) in blog.tags"
                  :key="index"
                  class="inline-block bg-neutral-700 text-xs text-white px-2 py-1 rounded-md"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </template>

    <div v-else class="text-center text-white/70 py-10">
      <p class="text-xl">Sorry, no posts found.</p>
    </div>
  </ContentList>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useHead } from "#imports";

const props = defineProps({
  search: { type: String, default: "" },
});

useHead({
  title: "only-nice company blog",
});

function filteredBlogs(list: any[]) {
  if (!props.search.trim()) {
    return list;
  }
  const q = props.search.toLowerCase();
  return list.filter((post) => {
    const title = (post.title || "").toLowerCase();
    const tagsStr = (post.tags || []).join(" ").toLowerCase();
    return title.includes(q) || tagsStr.includes(q);
  });
}

function formatDate(dateStr: string) {
  const dateObj = new Date(dateStr);
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const dd = String(dateObj.getDate()).padStart(2, "0");
  const yyyy = dateObj.getFullYear();
  return `${mm}.${dd}.${yyyy}`;
}
</script>
