<template>
  <article :class="$style.postArticle">
    <NuxtLink
      :to="`/${region}`"
      :class="$style.backButton"
      aria-label="Go back"
    >
      <UIcon
        :class="$style.arrowBack"
        name="i-solar-arrow-left-linear"
      />
    </NuxtLink>

    <div :class="$style.floatingButtons">
      <a
        href="#"
        :class="$style.buttonPurple"
      >
        <img
          src="/static-media-frontend/pliant/logo-sign-comics.svg"
          alt="comics"
        />
      </a>
      <a
        href="#"
        :class="$style.buttonPurple"
      >
        <img
          src="/static-media-frontend/pliant/logo-sign-collections.svg"
          alt="collections"
        />
      </a>
    </div>

    <h1 :class="$style.postTitle">{{ post?.title }}</h1>

    <div
      v-if="post?.meta?.thumbnail"
      :class="$style.postImageWrapper"
    >
      <img
        :src="post?.meta?.thumbnail.toString()"
        :alt="post.title"
        :class="$style.postImage"
      />
    </div>

    <div
      v-if="post"
      :class="$style.postContent"
    >
      <ContentRenderer :value="post" />
    </div>

    <div :class="$style.bottomLogos">
      <a
        href="#"
        :class="$style.bottomLogoLink"
      >
        <img
          src="/static-media-frontend/pliant/logo-comics.svg"
          alt="Only Nice Comics"
        />
      </a>
      <a
        href="#"
        :class="$style.bottomLogoLink"
      >
        <img
          src="/static-media-frontend/pliant/logo-collections.svg"
          alt="Only Nice Collections"
        />
      </a>
    </div>

    <div :class="$style.divider" />

    <div :class="$style.sliderSection">
      <NuxtLink
        v-for="item in filteredItems"
        :key="item.path"
        :to="`/${region}/${item.meta.slug}`"
        :class="$style.postCard"
      >
        <div :class="$style.postCardImageContainer">
          <img
            v-if="item.meta.thumbnail"
            :src="item.meta.thumbnail.toString()"
            :alt="item.title"
            :class="$style.postCardImage"
          />
        </div>
        <div :class="$style.postCardContent">
          <h3 :class="$style.postCardTitle">{{ item.title }}</h3>
          <p :class="$style.postCardDescription">{{ item.description }}</p>
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
  </article>
</template>

<script setup lang="ts">
  import type { Collections } from '@nuxt/content'

  import { joinURL, withLeadingSlash } from 'ufo'

  const route = useRoute()
  const { region, slug } = route.params

  const path = computed(() => withLeadingSlash(joinURL(region, slug)))
  const collection = computed(() => route.params?.region?.toString() as keyof Collections)

  const { data: post } = await useAsyncData(
    path.value,
    async () => (await queryCollection(collection.value).path(path.value).first()) as Collections['rus'],
  )

  if (!post.value) {
    throw createError({ statusCode: 404, statusMessage: 'Статья не найдена' })
  }

  const { data: relatedPosts } = await useAsyncData(
    `related-posts-${region}`,
    async () => await queryCollection(route.params?.region?.toString() as keyof Collections).all(),
  )

  const filteredItems = computed(() => getFilteredItems(relatedPosts.value || []))

  function getFilteredItems(items: Collections['rus'][]): void {
    const uniqueItems = new Map()
    items.forEach((item) => {
      if (item.meta?.slug) {
        uniqueItems.set(item.meta.slug, item)
      }
    })

    return Array.from(uniqueItems.values()).filter((item) => item.meta.slug !== slug)
  }
</script>

<style module>
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
  }
  .backButton:hover {
    color: #ececec;
  }

  @media (max-width: 640px) {
    .backButton {
      position: unset;
      padding: 0;
    }
  }

  .arrowBack {
    width: 25px;
    height: 25px;
  }

  @media (max-width: 640px) {
    .arrowBack {
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
  }

  @media (max-width: 640px) {
    .floatingButtons {
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
  }

  @media (max-width: 640px) {
    .buttonPurple {
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
  }

  @media (max-width: 640px) {
    .postTitle {
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
  }

  @media (max-width: 640px) {
    .postContent {
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
  }

  @media (min-width: 768px) {
    .bottomLogos {
      flex-direction: row;
      justify-content: center;
    }
  }

  @media (max-width: 640px) {
    .bottomLogos {
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
  }
  .bottomLogoLink:hover {
    background-color: #232323;
  }

  @media (max-width: 640px) {
    .bottomLogoLink {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px;
    }
    .bottomLogoLink img {
      height: 30px;
    }
  }

  .sliderSection {
    display: flex;
    align-items: center;
    gap: 25px;
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
  }
  .postCard:hover {
    opacity: 0.8;
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
  }
  .postCardImage:hover {
    transform: scale(1.05);
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
    color: #c5c5c5;
  }

  @media (max-width: 640px) {
    .postCardDescription {
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
  }

  @media (max-width: 640px) {
    .divider {
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
  }
  .createCardLink:hover {
    opacity: 0.7;
  }

  .arrowIcon {
    width: 12px;
    height: 12px;
  }
</style>
