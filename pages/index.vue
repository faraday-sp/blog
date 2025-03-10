<template>
  <div :class="$style.base">
    <div :class="$style.sliderContainer">
      <ContentList
          path="/posts"
          fields="title,thumbnail"
          :query="{ draft: false, sort: [{ date: -1 }] }"
          v-slot="{ list }"
      >
        <BaseSlider
            ref="sliderRef"
            :cl="[$style.slider]"
            :slideList="list"
            :gap="isMobile ? 6 : 40"
            :disabledPointerEvents="false"
            :autoplay="5000"
            loop
            :mod="['mainPageDots']"
            dots
        >
          <template #slide="{ slide: banner }">
            <img
                :src="banner.thumbnail"
                :alt="banner.title"
                draggable="false"
                :class="$style.carouselImage"
                @click="router.push(banner.slug)"
            />
          </template>
        </BaseSlider>

        <template v-if="list && list.length >= 1">
          <div
              :class="[$style.arrow, $style.arrowLeft]"
              @click.prevent="prevSlide"
          >
            <UIcon name="i-heroicons-chevron-left" />
          </div>
          <div
              :class="[$style.arrow, $style.arrowRight]"
              @click.prevent="nextSlide"
          >
            <UIcon name="i-heroicons-chevron-right" />
          </div>
        </template>
      </ContentList>
    </div>
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
          <img src="/static-media-frontend/pliant/logo-comics.svg" alt="Logo"/>
        </a>
        <a href="" :class="$style.heroLink">
          <img src="/static-media-frontend/pliant/logo-collections.svg" alt="Logo"/>
        </a>
      </div>
    </section>

    <div :class="$style.divider"/>

    <ContentList
        path="/posts"
        fields="title,date,thumbnail,slug,tags,description"
        :query="{ draft: false, sort: [{ date: -1 }] }"
        v-slot="{ list }"
    >
      <template v-if="paginatedPosts(list).length > 0">
        <div :class="$style.postsGrid">
          <NuxtLink
              v-for="blog in paginatedPosts(list)"
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

        <UPagination
            v-if="filteredBlogs(list).length > POSTS_PER_PAGE"
            v-model="page"
            :page-count="pageCount(list)"
            :total="filteredBlogs(list).length"
            :class="$style.pagination"
            show-last show-first
        />
      </template>

      <div v-else :class="$style.postsGridEmpty">
        <p :class="$style.postsGridEmptyText">Sorry, no posts found.</p>
      </div>
    </ContentList>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "#imports";

const props = defineProps({
  search: { type: String, default: "" },
});

const { isMobile } = useScreen()
const sliderRef = ref<ComponentInstance<BaseSlider> | null>(null)
const router = useRouter()

useHead({ title: "only-nice company blog" });

const POSTS_PER_PAGE = 12;
const page = ref(1);
const listPost = ref([])

function filteredBlogs(list: any[]) {
  if (!props.search.trim()) return list;
  const q = props.search.toLowerCase();
  return list.filter((post) => {
    const title = (post.title || "").toLowerCase();
    const tagsStr = (post.tags || []).join(" ").toLowerCase();
    listPost.value = title.includes(q) || tagsStr.includes(q);
    return title.includes(q) || tagsStr.includes(q);
  });
}

const paginatedPosts = (list: any[]) => {
  const filtered = filteredBlogs(list);
  const start = (page.value - 1) * POSTS_PER_PAGE;
  return filtered.slice(start, start + POSTS_PER_PAGE);
};

const pageCount = (list: any[]) => Math.ceil(filteredBlogs(list).length / POSTS_PER_PAGE);

function nextSlide(): void {
  sliderRef.value?.nextSlide()
  sliderRef.value?.restartAutoplay()
}
function prevSlide(): void {
  sliderRef.value?.prevSlide()
  sliderRef.value?.restartAutoplay()
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
    margin: 20px -16px;
  }
}

.sliderContainer {
  overflow-x: hidden;
  margin: 0 -24px;
  padding: 0 24px;
  position: relative;
  display: flex;
  justify-content: center;
  @include mobile {
    margin: 0 -16px;
    padding: 0 16px;
  }
}

.carouselImage {
  width: 100%;
  height: 316px;
  object-fit: cover;
  border-radius: 25px;
  cursor: pointer;
  @include mobile {
    height: 153px;
  }
}

.slider {
  --base-slider-overflow: visible;
  max-width: 1500px;
}

.banner {
  width: 100%;
  height: fit-content;
  min-width: 320px;
  border-radius: 25px;
  position: relative;
  overflow: hidden;

  @include mobile {
    gap: 8px;
    min-width: 280px;
  }
}

.arrow {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(2px);
  color: #fff;
  border-radius: 50px;
  border: 1px solid var(--surface-3);
  position: absolute;
  top: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease-in-out;
  transition-property: background, color;
  user-select: none;
  cursor: pointer;
  z-index: 2;
  --base-icon-size: 12px;
  &:hover {
    background: var(--text4);
    color: var(--text1);
  }
  @include mobile {
    display: none;
  }
}

.arrowRight {
  right: 150px;
  transform: translateX(50%) translateY(-50%);
}
.arrowLeft {
  left: 150px;
  transform: translateX(-50%) translateY(-50%);
}

.pagination {
  margin: 2rem auto;
  justify-content: center;
}

.heroTitle {
  margin-top: 24px;
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
  grid-template-columns: repeat(auto-fill, minmax(417px, 1fr));
  gap: 24px;
  grid-auto-rows: min-content;
  @include mobile {
    grid-template-columns: repeat(auto-fill, minmax(343px, 1fr));
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
