<template>
  <article :class="$style.postArticle">
    <NuxtLink
        to="/"
        :class="$style.backButton"
        aria-label="Go back"
    >
      <UIcon :class="$style.arrowBack" name="i-solar-arrow-left-linear" />
    </NuxtLink>

    <div :class="$style.floatingButtons">
      <a href="" :class="$style.buttonPurple">
        <img src="/static-media-frontend/pliant/logo-sign-comics.svg" alt="comics" />
      </a>
      <a href="" :class="$style.buttonPurple">
        <img src="/static-media-frontend/pliant/logo-sign-collections.svg" alt="collections" />
      </a>
    </div>

    <ContentDoc :path="`/posts/${slug}`" v-slot="{ doc }">
      <h1 :class="$style.postTitle">
        {{ doc.title }}
      </h1>
      <div v-if="doc.thumbnail" :class="$style.postImageWrapper">
        <img
            :src="doc.thumbnail"
            :alt="doc.title"
            :class="$style.postImage"
        />
      </div>
      <div :class="$style.postContent">
        <ContentRenderer :value="doc" />
      </div>
    </ContentDoc>

    <div :class="$style.bottomLogos">
      <a href="" :class="$style.bottomLogoLink">
        <img
            src="/static-media-frontend/pliant/logo-comics.svg"
            alt="Only Nice Comics"
        />
      </a>
      <a href="" :class="$style.bottomLogoLink">
        <img
            src="/static-media-frontend/pliant/logo-collections.svg"
            alt="Only Nice Collections"
        />
      </a>
    </div>
    <div :class="$style.divider"/>
    <ContentList
        path="/posts"
        fields="title,date,thumbnail,slug,tags,description"
        :query="{ draft: false, sort: [{ date: -1 }] }"
        v-slot="{ list }"
    >
      <div :class="$style.sliderSection">
        <UCarousel
            v-model="currentIndex"
            :items="getFilteredItems(list)"
            :arrows="getFilteredItems(list).length > 4"
            @update:modelValue="onSlideChange"
            :ui="{
              item: 'flex-none px-2',
              container: 'rounded-lg flex flex-row'
            }"
        >
          <NuxtLink
              v-for="post in getFilteredItems(list)"
              :key="post._path"
              :to="post.slug"
              :class="$style.postCard"
          >
            <div :class="$style.postCardImageContainer">
              <img
                  v-if="post.thumbnail"
                  :src="post.thumbnail"
                  :alt="post.title"
                  :class="$style.postCardImage"
              />
            </div>
            <div :class="$style.postCardContent">
              <h3 :class="$style.postCardTitle">
                {{ post.title }}
              </h3>
              <p :class="$style.postCardDescription">
                {{ post.description }}
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
        </UCarousel>
      </div>
    </ContentList>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from "vue-router"

const { slug } = useRoute().params
const currentIndex = ref(0)

function onSlideChange(newVal: number) {
  currentIndex.value = newVal
}

function getFilteredItems(items: any[]) {
  return items
      .filter(item => item.slug !== slug)
      .filter((item, idx, arr) =>
          arr.findIndex(el => el.slug === item.slug) === idx
      )
}

const prevButtonProps = {
  color: 'gray',
  icon: 'i-heroicons-arrow-left-20-solid',
  class: '-start-12'
}

const nextButtonProps = {
  color: 'gray',
  icon: 'i-heroicons-arrow-right-20-solid',
  class: '-end-12'
}
</script>

<style lang="scss" module>
.postArticle {
  position: relative;
  background-color: #171717;
  color: #fff;
  box-sizing: border-box;
}

.backButton {
  position: absolute;
  left: 1rem;
  padding: 0.5rem 0.75rem;
  font-size: 1.25rem;
  border-radius: 0.375rem;
  text-decoration: none;
  color: #fff;
  transition: color 0.3s;
  &:hover {
    color: #ececec;
  }
  @include mobile {
    position: unset;
    padding: 0;
  }
}

.arrowBack {
  width: 25px;
  height: 25px;
  @include mobile {
    width: 15px;
    height: 15px;
  }
}

.floatingButtons {
  cursor: pointer;
  position: fixed;
  top: 25%;
  right: 1.5rem;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  z-index: 20;
  @include mobile {
    display: none;
  }
}

.buttonPurple {
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: #3f3f46;
  display: flex;
  align-items: center;
  justify-content: center;
  @include mobile {
    width: 40px;
    height: 40px;
  }
}

.postTitle {
  font-size: 1.75rem;
  font-weight: 700;
  max-width: 48rem;
  margin: 26px auto 32px;
  text-align: left;
  @include mobile {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    margin: 13px auto 16px;
  }
}

.postImageWrapper {
  max-width: 48rem;
  margin: 0 auto 32px;
}
.postImage {
  display: block;
  width: 100%;
  max-height: 446px;
  border-radius: 0.5rem;
  object-fit: cover;
}

.postContent {
  max-width: 48rem;
  margin: 0 auto 2rem;
  line-height: 1.7;
  @include mobile {
    max-width: 100%;
    padding: 0;
  }
}

.bottomLogos {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  margin-bottom: 2rem;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
  @include mobile {
    gap: 12px;
  }
}
.bottomLogoLink {
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

.sliderSection {
  margin: 0 auto;
  text-align: center;
}

.sliderTitle {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.postCard {
  width: 320px;
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
  width: 100%;
  border-radius: 1rem;
  height: 170px;
  position: relative;
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
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: space-between;
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