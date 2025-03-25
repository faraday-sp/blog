<template>
  <footer :class="[$style.footer, ...props.cl]">
    <div :class="$style.footerContainer">
      <div class="flex items-center gap-4">
        <NuxtLink
          to="/"
          :cl="['transition-transform duration-300 active:scale-95 flex rounded-md w-fit']"
        >
          <BaseImg
            src="logo.svg"
            :cl="['min-w-36 w-36 mb:min-w-32 mb:w-32']"
          />
        </NuxtLink>
      </div>
      <nav :class="$style.footerNav">
        <NuxtLink
          to=""
          :class="$style.footerLink"
        >
          Privacy Policy
        </NuxtLink>
        <NuxtLink
          to=""
          :class="$style.footerLink"
        >
          Terms of Service
        </NuxtLink>
        <NuxtLink
          to=""
          :class="$style.footerLink"
        >
          Support
        </NuxtLink>
      </nav>

      <div :class="$style.footerRight">
        <div :class="$style.footerSocials">
          <NuxtLink
            :to="FACEBOOKLINK"
            aria-label="Facebook"
            :class="$style.socialLink"
          >
            <img
              src="/static-media-frontend/icon/facebook.svg"
              alt="Facebook"
            />
          </NuxtLink>
          <NuxtLink
            :to="TWITTERLINK"
            aria-label="Twitter"
            :class="$style.socialLink"
          >
            <img
              src="/static-media-frontend/icon/twitter.svg"
              alt="Twitter"
            />
          </NuxtLink>
          <NuxtLink
            :to="TELEGRAMLINK"
            aria-label="Telegram"
            :class="$style.socialLink"
          >
            <img
              src="/static-media-frontend/icon/telegram.svg"
              alt="Telegram"
            />
          </NuxtLink>
          <NuxtLink
            :to="INSTAGRAMLINK"
            aria-label="Instagram"
            :class="$style.socialLink"
          >
            <img
              src="/static-media-frontend/icon/instagram.svg"
              alt="Instagram"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
    <div :class="$style.footerCopyright">© {{ currentYear }} Only Nice</div>
  </footer>
</template>

<script setup lang="ts">
  const props = defineProps<{
    cl: PropsCl[]
  }>()

  const FACEBOOKLINK = '#'
  const TWITTERLINK = '#'
  const TELEGRAMLINK = '#'
  const INSTAGRAMLINK = '#'

  const currentYear = new Date().getFullYear()
</script>

<style module>
  .footer {
    background-color: #171717;
    color: #ffffff;
    border-top: 1px solid #2b2b2b;
  }

  .footerContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    padding: 24px;
  }

  @media (max-width: 640px) {
    .footerContainer {
      padding: 16px;
      flex-direction: column;
    }
  }

  .logoContainer {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .logoLink {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
  }

  .footerNav {
    display: flex;
    gap: 2rem;
    cursor: pointer;
  }

  /* Mobile layout adjustments for footerNav */
  @media (max-width: 640px) {
    .footerNav {
      flex-direction: column;
      gap: 12px;
      text-align: center;
      margin: 32px 0;
    }
  }

  .footerLink {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #ffffff;
    transition: opacity 0.2s;
  }

  .footerLink:hover {
    opacity: 0.7;
  }

  .footerRight {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .footerSocials {
    display: flex;
    gap: 1rem;
  }

  .socialLink {
    color: #ffffff;
    font-size: 1.2rem;
    text-decoration: none;
    transition: opacity 0.2s;
  }

  .socialLink:hover {
    opacity: 0.7;
  }

  .footerCopyright {
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 0 24px 24px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #d2d2d2;
  }

  @media (max-width: 640px) {
    .footerCopyright {
      justify-content: center;
      margin-top: 32px;
    }
  }
</style>
