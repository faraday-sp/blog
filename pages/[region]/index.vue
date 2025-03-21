<template>
  <div v-if="pending" :class="$style.loading">
    <img src="/static-media-frontend/icon/tube-spinner.svg" alt="loading..." />
  </div>

  <div v-else-if="isNotFound" :class="$style.errorBase">
    <div :class="$style.errorBaseTitle">Page not found</div>
    <div :class="$style.errorBaseDesription">
      The page you are looking for doesn’t exist or has been moved
    </div>
    <UButton
        size="lg"
        color="green"
        :class="$style.errorBaseButton"
        @click="router.replace('/')"
    >
      Back to home
    </UButton>
  </div>

  <div v-else :class="$style.base">
    <div v-if="bannersPending" :class="$style.loading">
      <img src="/static-media-frontend/icon/tube-spinner.svg" alt="loading..." />
    </div>

    <div v-else-if="bannerList?.length">
      <div :class="$style.sliderContainer">
        <BaseSlider
            ref="sliderRef"
            :cl="[$style.slider]"
            :slideList="bannerList"
            :gap="isMobile ? 15 : 25"
            :disabledPointerEvents="false"
            :autoplay="5000"
            loop
            :mod="['mainPageDots']"
            dots
        >
          <template #slide="{ slide: banner }">
            <img
                :src="banner.meta?.thumbnail"
                :alt="banner.title"
                draggable="false"
                :class="$style.carouselImage"
                @click="router.push(banner.path)"
            />
          </template>
        </BaseSlider>

        <template v-if="bannerList.length >= 1">
          <div :class="[$style.arrow, $style.arrowLeft]" @click.prevent="prevSlide">
            <UIcon name="i-heroicons-chevron-left" />
          </div>
          <div :class="[$style.arrow, $style.arrowRight]" @click.prevent="nextSlide">
            <UIcon name="i-heroicons-chevron-right" />
          </div>
        </template>
      </div>
    </div>

    <section>
      <h2 :class="$style.heroTitle">New here? Let’s begin your journey.</h2>
      <p :class="$style.heroDescription">
        Explore our comprehensive step-by-step guides and unlock the potential
        to master new skills effortlessly. Whether you’re a beginner or looking
        to refine your expertise, our detailed tutorials will help you learn
        with ease and confidence.
      </p>
      <div :class="$style.heroLinks">
        <a href="" :class="$style.heroLink">
          <img src="/static-media-frontend/pliant/logo-comics.svg" alt="Logo" />
        </a>
        <a href="" :class="$style.heroLink">
          <img
              src="/static-media-frontend/pliant/logo-collections.svg"
              alt="Logo"
          />
        </a>
      </div>
    </section>

    <div :class="$style.divider" />
    <template v-if="allPosts && paginatedPosts(allPosts).length > 0">
      <div :class="$style.postsGrid">
        <NuxtLink
            v-for="blog in paginatedPosts(allPosts)"
            :key="blog.path"
            :to="blog.path"
            :class="$style.postCard"
        >
          <div :class="$style.postCardImageContainer">
            <img
                :src="blog.meta?.thumbnail"
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
                  name="i-solar-arrow-right-up-linear"
              />
            </div>
          </div>
        </NuxtLink>
      </div>

      <UPagination
          v-if="filteredBlogs(allPosts).length > POSTS_PER_PAGE"
          v-model="page"
          :page-count="pageCount(allPosts)"
          :total="filteredBlogs(allPosts).length"
          :class="$style.pagination"
          show-last
          show-first
      />
    </template>

    <div v-else :class="$style.postsGridEmpty">
      <p :class="$style.postsGridEmptyText">No posts found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { countryList } from "@/assets/country";

interface BannerItem {
  title: string;
  path: string;
  meta?: {
    thumbnail?: string;
  };
}

interface PostItem {
  title: string;
  path: string;
  thumbnail?: string;
  date?: string;
  slug?: string;
  tags?: string[];
  description?: string;
  meta?: Record<string, any>;
}

const props = defineProps({
  search: { type: String, default: "" },
});

const { isMobile } = useScreen();
const sliderRef = ref<ComponentInstance<BaseSlider> | null>(null);
const route = useRoute();
const router = useRouter();
const page = ref(1);
const isNotFound = ref(false);
const pending = ref(true);
const regions = ref("");
const POSTS_PER_PAGE = 12;

const { data: bannerList, pending: bannersPending } = await useAsyncData(route.path, () => {
  return queryCollection("rus").all();
});

const { data: allPosts } = await useAsyncData(route.path, () => {
  return queryCollection("rus").all();
});

function filteredBlogs(list: PostItem[]) {
  if (!props.search.trim()) return list;
  const q = props.search.toLowerCase();
  return list.filter((post) => {
    const title = (post.title || "").toLowerCase();
    const tagsStr = (post.tags || []).join(" ").toLowerCase();
    return title.includes(q) || tagsStr.includes(q);
  });
}

const paginatedPosts = (list: any[]) => {
  const filtered = filteredBlogs(list);
  const start = (page.value - 1) * POSTS_PER_PAGE;
  return filtered.slice(start, start + POSTS_PER_PAGE);
};

const pageCount = (list: any[]) =>
  Math.ceil(filteredBlogs(list).length / POSTS_PER_PAGE);

function nextSlide(): void {
  sliderRef.value?.nextSlide();
  sliderRef.value?.restartAutoplay();
}

function prevSlide(): void {
  sliderRef.value?.prevSlide();
  sliderRef.value?.restartAutoplay();
}

function getRegionByCountry(countryCode: string): string {
  const region = Object.values(countryList).find(
    (region) => region === countryCode
  );
  return region || "";
}

onMounted(() => {
  const countryCode = route.params.region;

  if (countryCode) {
    const regionFound = getRegionByCountry(countryCode.toString());
    if (regionFound) {
      regions.value = regionFound;
      isNotFound.value = false;
    } else {
      isNotFound.value = true;
    }
  } else {
    isNotFound.value = true;
  }

  pending.value = false;
});
</script>

<style lang="scss" module>
.base {
  font-family: "Montserrat", sans-serif;
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
    border-radius: 12px;
  }
}

.slider {
  --base-slider-overflow: visible;
  max-width: 1500px;
  @include mobile {
    max-width: 300px;
  }
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
    border-radius: 12px;
    min-width: 280px;
  }
}

.arrow {
  background: rgba(255, 255, 255, 0.25);
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
    background: rgba(218, 218, 218, 0.25);
    color: #fff;
  }
  @include mobile {
    display: none;
  }
}

.arrowRight {
  span {
    width: 30px;
    height: 30px;
  }
  right: 150px;
  transform: translateX(50%) translateY(-50%);
}
.arrowLeft {
  span {
    width: 30px;
    height: 30px;
  }
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
  max-width: 54rem;
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
  gap: 60px;
  margin: 60px 0 60px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
  @include mobile {
    gap: 12px;
    margin: 40px 0 40px;
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
      height: 30px;
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
    opacity: 0.8;
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
  color: #c5c5c5;
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

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 60px;
    height: 60px;
  }
}

.errorBase {
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 881px;
  height: 488px;
  background-image: url("/static-media-frontend/pliant/404.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  @include mobile {
    width: 375px;
    background-position: 50% 30%;
    background-size: 95%;
  }
}
.errorBaseTitle {
  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  line-height: 160%;
  color: #ffffff;
  margin-bottom: 24px;
  @include mobile {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 160%;
    margin-bottom: 2px;
  }
}
.errorBaseDesription {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 160%;
  text-align: center;
  color: #cfcfcf;
  margin-bottom: 24px;
  max-width: 358px;
  @include mobile {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 160%;
    text-align: center;
    margin-bottom: 75px;
    max-width: 316px;
  }
}
.errorBaseButton {
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  width: 358px;
  @include mobile {
    width: 330px;
  }
}
</style>
