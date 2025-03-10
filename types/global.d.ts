export {}
declare global {
  interface Window {
    dataLayer?: {
      push: (value: { event: string; eventModel?: unknown }) => void
    }
    Intercom?: (action: string, options?: number | unknown) => void
    pwaInstallEvent?: {
      prompt: () => Promise<{
        outcome: 'accepted' | 'dismissed'
        platform: string
      }>
    }
    Telegram: {
      Utils: {
        urlParseHashParams: (value: string) => { _path: string }
        urlSafeDecode: (value: string) => string
      }
      WebApp: {
        BackButton: {
          isVisible: boolean
          onClick: (callback: () => void) => void
          show: () => void
        }
        enableClosingConfirmation: () => void
        expand: () => void
      }
      WebView: {
        initParams: {
          auth_date: string
          hash: string
          user: string
        }
      }
    }
  }
}
