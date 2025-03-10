type ReactiveString = ComputedRef<string> | Ref<string>

export function useMeta(payload: {
  key: ReactiveString | string
  params?: (ReactiveString | string)[]
  robots?: string
}): void {
  const config = useRuntimeConfig()
  const locale = useLocale()

  const slug = getSlug({ key: payload.key, locale, params: payload.params, siteName: config.public.name })
  useSeoMeta({
    description: () => slug({ type: 'description' }),
    keywords: () => slug({ type: 'keywords' }),
    ogDescription: () => slug({ type: 'description' }),
    ogImage: () => slug({ type: 'image' }),
    ogTitle: () => slug({ type: 'title' }),
    robots: payload.robots,
    title: () => slug({ type: 'title' }),
  })
  useServerSeoMeta({
    description: () => slug({ type: 'description' }),
    keywords: () => slug({ type: 'keywords' }),
    ogDescription: () => slug({ type: 'description' }),
    ogImage: () => slug({ type: 'image' }),
    ogTitle: () => slug({ type: 'title' }),
    title: () => slug({ type: 'title' }),
  })
}
function getSlug({
  key,
  locale,
  params,
  siteName,
}: {
  key: ReactiveString | string
  locale: Locale
  params?: (ReactiveString | string)[]
  siteName: string
}): (payload: { type: 'description' | 'image' | 'keywords' | 'title' }) => string {
  const defaultMeta = {
    'seo._description': '%s Description',
    'seo._image': '/ogImages/main.jpg',
    'seo._keywords': '%s',
    'seo._title': '%s ',
  }

  const refineKey = isReactiveString(key) ? key.value : key

  return ({ type }) => {
    const translate =
      (locale.te(`${siteName}.seo.${refineKey}._${type}`) && locale.t(`${siteName}.seo.${refineKey}._${type}`)) ||
      (locale.te(`seo.${refineKey}._${type}`) && locale.t(`seo.${refineKey}._${type}`)) ||
      (locale.te(`seo.default._${type}`) && locale.t(`seo.default._${type}`)) ||
      defaultMeta[`seo._${type}`]
    let valuePatched = translate

    if (params) {
      const refineParams = params.map((param) => (isReactiveString(param) ? param.value : param))
      valuePatched = sprintfTranslate(translate, refineParams)
      return valuePatched
    }
    valuePatched = sprintfTranslate(translate, [capitalize(siteName)])

    return valuePatched
  }
}

function isReactiveString(value: ReactiveString | string): value is ReactiveString {
  return Boolean(isReactive(value) || isReadonly(value))
}
