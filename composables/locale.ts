import type { WritableComputedRef } from 'vue'
import type { Locale as I18nLocale } from 'vue-i18n'

export interface Locale {
  availableLocale: string[]
  getRealPath: (route: ReturnType<typeof useRoute>) => string
  locale: WritableComputedRef<string>
  setLocale: (locale: string) => void
  t: (key: string) => string
  te: (key: string) => boolean
}
let initMissingHandler = false
export function useLocale(): Locale {
  const i18n = useI18n()
  // const { $di } = useNuxtApp()
  if (!initMissingHandler) {
    i18n.setMissingHandler((lang, key) => {
      console.warn(`No translation, 🌍 ${lang}, 🔧 '${key}'`)
    })
    initMissingHandler = true
  }
  function getRealPath(route: ReturnType<typeof useRoute>): string {
    const languageList = i18n.availableLocales

    const regexStr = `\\/${languageList.join('\\/|\\/')}\\/|\\/${languageList.join('$|\\/')}$`
    const regExp = new RegExp(regexStr, 'gi')

    return route.path.replace(regExp, '/')
  }
  return {
    availableLocale: i18n.availableLocales,
    getRealPath,
    locale: i18n.locale,
    setLocale: (locale) => {
      i18n.setLocale(locale as I18nLocale)
      // await $di.user.setLocale(locale)
    },
    t(key) {
      if (process.server) {
        const translate = i18n.getLocaleMessage(i18n.locale.value)[key]
        return translate ? String(translate).replaceAll(/\{'|'\}/g, '') : key
      }
      return i18n.t(key)
    },
    te(key) {
      const translate = i18n.getLocaleMessage(i18n.locale.value)[key]
      return Boolean(translate)
    },
  }
}
