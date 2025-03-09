<template>
  <footer :class="$style.footer">
    <div :class="$style.footerContainer">
      <div :class="$style.logoContainer">
        <NuxtLink to="/" :class="$style.logoLink">
          <img
              src="/static-media-frontend/pliant/logo.svg"
              alt="Logo"
          />
        </NuxtLink>
      </div>
      <nav :class="$style.footerNav">
        <NuxtLink :to="privacyLink" :class="$style.footerLink">
          Privacy Policy
        </NuxtLink>
        <NuxtLink :to="termsLink" :class="$style.footerLink">
          Terms of Service
        </NuxtLink>
        <NuxtLink :to="supportLink" :class="$style.footerLink">
          Support
        </NuxtLink>
      </nav>

      <div :class="$style.footerRight">
        <div :class="$style.footerSocials">
          <NuxtLink :to="facebookLink" aria-label="Facebook" :class="$style.socialLink">
            <img src="/static-media-frontend/icon/facebook.svg" alt="Facebook" />
          </NuxtLink>
          <NuxtLink :to="twitterLink" aria-label="Twitter" :class="$style.socialLink">
            <img src="/static-media-frontend/icon/twitter.svg" alt="Twitter" />
          </NuxtLink>
          <NuxtLink :to="telegramLink" aria-label="Telegram" :class="$style.socialLink">
            <img src="/static-media-frontend/icon/telegram.svg" alt="Telegram" />
          </NuxtLink>
          <NuxtLink :to="instagramLink" aria-label="Instagram" :class="$style.socialLink">
            <img src="/static-media-frontend/icon/instagram.svg" alt="Instagram" />
          </NuxtLink>
        </div>
      </div>
    </div>
    <div :class="$style.footerCopyright">
      © {{ currentYear }} Only Nice
    </div>
  </footer>
</template>

<script setup lang="ts">
const privacyLink = '/privacy'
const termsLink = '/terms'
const supportLink = '/support'

const facebookLink = '#'
const twitterLink = '#'
const telegramLink = '#'
const instagramLink = '#'

const currentYear = new Date().getFullYear()
</script>

<style lang="scss" module>
.footer {
  background-color: #000000;
  color: #ffffff;
  border-top: 1px solid #2b2b2b;
}

.footerContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 24px;
  @include mobile {
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
  @include mobile {
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
  color: #FFFFFF;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
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

  &:hover {
    opacity: 0.7;
  }
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
  color: #D2D2D2;
  @include mobile {
    justify-content: center;
    margin-top: 32px;
  }
}
</style>
