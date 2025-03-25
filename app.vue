<template>
  <div :class="$style.base">
    <Header
      :search="search"
      :cl="[$style.header]"
      @update:search="(val: string) => (search = val)"
    />

    <Main
      :search="search"
      :cl="[$style.main]"
    />

    <Footer :cl="[$style.footer]" />
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

<style module>
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
  }

  @media (max-width: 768px) {
    .main {
      justify-content: flex-start;
      --bottomNavHeight: 1px;
      min-height: calc(100dvh - var(--headerHeightCollections) - var(--bottomNavHeight));
    }
  }
</style>
