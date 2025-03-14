<template>
  <div :class="$style.base">
    <Header
        :search="search"
        @update:search="(val: string) => search = val"
        :class="$style.header"
    />

    <Main :search="search" :class="$style.main" />

    <Footer :class="$style.footer" />
  </div>
</template>

<script setup lang="ts">
const search = ref('')

const colorMode = useColorMode()
colorMode.preference = 'dark'

const initPage = ref(false)

useScreen({
  desktop: '(min-width: 1152px)',
  mobile: '(max-width: 768px)',
  tablet: '(max-width: 1152px) and (min-width: 768px)',
})

onMounted(() => {
  colorMode.preference = 'dark'
  initPage.value = true
})
</script>

<style lang="scss" module>
.base {
  display: grid;
  grid-template-areas:
      'header header header'
      'sidebar main main'
      'sidebar main main'
      'sidebar footer footer'
      'bottomNav bottomNav bottomNav';
  grid-template-columns: auto 1fr;
}
.header {
  grid-area: header;
}
.footer {
  grid-area: footer;
}
.bottomNav {
  grid-area: bottomNav;
}
.main {
  grid-area: main;
  display: flex;
  flex-direction: column;
  min-height: calc(100dvh - var(--headerHeightCollections));
  justify-content: space-between;
  width: 100%;
  justify-self: center;
  @include mobile {
    justify-content: flex-start;
    --bottomNavHeight: 1px;
    min-height: calc(100dvh - var(--headerHeightCollections) - var(--bottomNavHeight));
  }
}
</style>