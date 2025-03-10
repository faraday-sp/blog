import type { ToRefs } from 'vue'

interface ScreenList {
  isDesktop: boolean
  isLaptop: boolean
  isMobile: boolean
  isTablet: boolean
}
interface ScreenQuery {
  desktop: string
  laptop: string
  mobile: string
  tablet: string
}
const screens = reactive<ScreenList>({
  isDesktop: false,
  isLaptop: false,
  isMobile: false,
  isTablet: false,
})
export function useScreen(query?: ScreenQuery): ToRefs<ScreenList> {
  if (query && import.meta.client) {
    onMounted(() => {
      const createListener = (screen: keyof ScreenList) => {
        return (event: MediaQueryList | MediaQueryListEvent) => {
          if (event.matches) {
            screens[screen] = true
          } else {
            screens[screen] = false
          }
        }
      }
      const onChangeDesktop = createListener('isDesktop')
      const onChangeLaptop = createListener('isLaptop')
      const onChangeTablet = createListener('isTablet')
      const onChangeMobile = createListener('isMobile')
      const mqlDesktop = window.matchMedia(query.desktop)
      const mqlLaptop = window.matchMedia(query.laptop)
      const mqlTablet = window.matchMedia(query.tablet)
      const mqlMobile = window.matchMedia(query.mobile)
      mqlDesktop.addEventListener('change', onChangeDesktop)
      onChangeDesktop(mqlDesktop)
      mqlLaptop.addEventListener('change', onChangeLaptop)
      onChangeLaptop(mqlLaptop)
      mqlTablet.addEventListener('change', onChangeTablet)
      onChangeTablet(mqlTablet)
      mqlMobile.addEventListener('change', onChangeMobile)
      onChangeMobile(mqlMobile)
    })
  }

  return toRefs(screens)
}
