<template>
  <div :class="$style.base">
    <section>
      <h2 :class="$style.heroTitle">
        New here? Let’s begin your journey.
      </h2>
      <p :class="$style.heroDescription">
        Explore our comprehensive step-by-step guides and unlock the potential
        to master new skills effortlessly. Whether you’re a beginner or looking
        to refine your expertise, our detailed tutorials will help you learn
        with ease and confidence.
      </p>
      <div :class="$style.heroLinks">

        <a href="" :class="$style.heroLink">
          <img
              src="/static-media-frontend/pliant/logo-comics.svg"
              alt="Logo"
          />
        </a>
        <a href="" :class="$style.heroLink">
          <img
              src="/static-media-frontend/pliant/logo-collections.svg"
              alt="Logo"
          />
        </a>
      </div>
    </section>

    <div :class="$style.divider"/>

    <ContentList
        path="/posts"
        fields="title,date,thumbnail,slug,tags"
        :query="{ draft: false, sort: [{ date: -1 }] }"
        v-slot="{ list }"
    >
      <template v-if="filteredBlogs(list).length > 0">
        <div :class="$style.postsGrid">
          <NuxtLink
              v-for="blog in filteredBlogs(list)"
              :key="blog._path"
              :to="blog.slug"
              :class="$style.postCard"
          >
            <div :class="$style.postCardImageContainer">
              <img
                  v-if="blog.thumbnail"
                  :src="blog.thumbnail"
                  :alt="blog.title"
                  :class="$style.postCardImage"
              />
            </div>
            <div :class="$style.postCardContent">
              <h3 :class="$style.postCardTitle">
                {{ blog.title }}
              </h3>
              <p :class="$style.postCardDescription">
                {{ blog.description }}
              </p>
              <div :class="$style.createCardLink">
                try blog
                <UIcon
                    :class="$style.arrowIcon"
                    name="i-heroicons-arrow-up-right"
                />
              </div>
            </div>
          </NuxtLink>
        </div>
      </template>
      <div v-else :class="$style.postsGridEmpty">
        <p :class="$style.postsGridEmptyText">Sorry, no posts found.</p>
      </div>
    </ContentList>

  </div>
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
</script>

<style lang="scss" module>
.base {
  font-family: 'Montserrat', sans-serif;
  color: #fff;
  text-align: center;
}

.divider {
  background-color: #2b2b2b;
  border: none;
  height: 1px;
  width: auto;
  margin: 24px -24px;
  @include mobile {
    margin: 20px -0.75rem;
  }
}

.heroTitle {
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 49px;
  color: #ffffff;
  @include mobile {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
  }
}

.heroDescription {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 160%;
  max-width: 48rem;
  margin: 16px auto 0;
  color: #c5c5c5;
  @include mobile {
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 160%;
    text-align: center;
  }
}

.heroLinks {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin: 24px 0 0;

  @media (min-width: 768px) {
    flex-direction: row;
  }
}

.heroLink {
  display: block;
  background-color: #1c1c1c;
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;
  transition: background-color 0.3s;
  width: 299px;

  &:hover {
    background-color: #232323;
  }
  @include mobile {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 54px;
    }
    padding: 12px;
  }
}

.postsGrid {
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
  padding-bottom: 24px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.postsGridEmpty {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  padding: 2.5rem 0;
}

.postsGridEmptyText {
  font-size: 1.25rem;
}

.postCard {
  border-radius: 1rem;
  overflow: hidden;
  transition: box-shadow 0.3s;
  min-width: 170px;
  display: block;
  text-align: left;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

.postCardImageContainer {
  border-radius: 1rem;
  position: relative;
  height: 260px;
  overflow: hidden;
}

.postCardImage {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
}

.postCardContent {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.postCardTitle {
  width: 100%;
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.postCardDescription {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
  color: #C5C5C5;
  @include mobile {
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 17px;
  }
}

.createCardLink {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 1rem;
  color: #00ff99;
  text-decoration: none;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }
}

.arrowIcon {
  width: 12px;
  height: 12px;
}

</style>
