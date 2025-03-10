import type { ComponentCustomProperties as _ComponentCustomProperties } from 'vue'

import type { DIContainer } from '../core/di'

export {}

interface PluginInjection {
  $di: DIContainer
  $i18n: {
    fallbackLocale: Computed<string>
    setLocale: (lang: string) => Promise<void>
    t: (param: string) => string
  }
}
declare module '#app' {
  interface NuxtApp extends PluginInjection {}
}

declare module 'nuxt/dist/app/nuxt' {
  interface NuxtApp extends PluginInjection {}
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties extends _ComponentCustomProperties {}
}

interface _GlobalComponents {
  Code: unknown
  CodeBase: unknown
  VitePwaManifest: unknown
}

declare module '@vue/runtime-core' {
  export interface GlobalComponents extends _GlobalComponents {}
}

declare module '@vue/runtime-dom' {
  export interface GlobalComponents extends _GlobalComponents {}
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents {}
}
