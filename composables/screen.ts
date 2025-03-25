import type { ToRefs } from 'vue'

interface ScreenList {
  isDesktop: boolean
  isMobile: boolean
  isTablet: boolean
}
interface ScreenQuery {
  desktop: string
  mobile: string
  tablet: string
}
const screens = reactive<ScreenList>({
  isDesktop: false,
  isMobile: false,
  isTablet: false,
})
const isVirtualKeyboard = ref(false)

export function useScreen(query?: ScreenQuery): ToRefs<ScreenList & { isVirtualKeyboard: boolean }> {
  if (query && import.meta.client) {
    function openVirtualKeyboard(): void {
      if (!screens.isDesktop) {
        isVirtualKeyboard.value = true
      }
    }
    function closeVirtualKeyboard(): void {
      isVirtualKeyboard.value = false
    }

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
      const onChangeTablet = createListener('isTablet')
      const onChangeMobile = createListener('isMobile')
      const mqlDesktop = window.matchMedia(query.desktop)
      const mqlTablet = window.matchMedia(query.tablet)
      const mqlMobile = window.matchMedia(query.mobile)
      mqlDesktop.addEventListener('change', onChangeDesktop)
      onChangeDesktop(mqlDesktop)
      mqlTablet.addEventListener('change', onChangeTablet)
      onChangeTablet(mqlTablet)
      mqlMobile.addEventListener('change', onChangeMobile)
      onChangeMobile(mqlMobile)

      document.addEventListener('focusin', (event) => {
        const target = event.target
        if (target instanceof HTMLElement && (target.nodeName === 'INPUT' || target.nodeName === 'TEXTAREA')) {
          openVirtualKeyboard()
        }
      })
      document.addEventListener('focusout', closeVirtualKeyboard)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('focusin', openVirtualKeyboard)
      document.removeEventListener('focusout', closeVirtualKeyboard)
    })
  }

  return {
    isVirtualKeyboard,
    ...toRefs(screens),
  }
}
