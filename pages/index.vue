<template>
  <div :class="$style.loading">
    <img
      src="/static-media-frontend/icon/tube-spinner.svg"
      alt="loading..."
    />
  </div>
</template>

<script setup lang="ts">
  import { countryList } from '@/assets/country'

  const router = useRouter()

  function getRegionByCountry(countryCode: string): string {
    return countryList[countryCode] || 'usa'
  }

  onBeforeMount(async () => {
    try {
      const res = await fetch('https://api.country.is/')
      const data = await res.json()

      if (data.country) {
        const countryCode = data.country
        const region = getRegionByCountry(countryCode)

        await router.replace(`/${region}`)
      } else {
        await router.replace('/usa')
      }
    } catch (error) {
      console.log('error', error)
      await router.replace('/usa')
    }
  })
</script>

<style lang="scss" module>
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
</style>
