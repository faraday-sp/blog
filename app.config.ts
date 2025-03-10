export default defineAppConfig({
  colorMode: {
    fallback: 'dark',
    preference: 'dark',
  },
  icons: {
    dynamic: true,
  },
  ui: {
    badge: {
      variant: {
        soft: 'bg-{color}-50 dark:bg-{color}-800 dark:bg-opacity-80 backdrop-blur-md backdrop-saturate-150 text-{color}-500 dark:text-{color}-400',
      },
    },
    breadcrumb: {
      default: {
        divider: 'i-heroicons-chevron-right-20-solid',
      },
      li: 'min-w-fit',
    },
    button: {
      color: {
        gray: {
          ghost:
            'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-40 flex-shrink-0 font-semibold text-gray-400 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800 disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400 inline-flex items-center',
          outline:
            'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-semibold ring-1 ring-inset ring-gray-600 text-gray-600 dark:text-gray-400 bg-gray-800 hover:bg-gray-800 disabled:bg-gray-500 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400 inline-flex items-center',
          soft: 'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-semibold text-gray-400 dark:text-gray-400 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-500 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400 inline-flex items-center',
          solid:
            'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-semibold ring-1 ring-gray-600 text-gray-600 dark:text-gray-300 bg-gray-800 dark:hover:bg-gray-700 disabled:bg-gray-500 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400 inline-flex items-center',
        },
        primary: {
          ghost:
            'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-semibold text-primary-400 dark:text-primary-400 hover:bg-primary-900 disabled:bg-primary-500 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center',
          soft: 'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-primary-900 flex-shrink-0 font-semibold text-primary-400 dark:text-primary-400 bg-primary-900 hover:bg-primary-800 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center',
          solid:
            'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-primary-900 flex-shrink-0 font-semibold text-primary-950 dark:text-primary-900 bg-primary-400 hover:bg-primary-300 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-200 dark:focus-visible:ring-primary-200 inline-flex items-center',
        },
      },
      font: 'font-semibold',
      gap: { xs: 'dark:gap-1.5' },
    },
    formGroup: {
      error: 'mt-1 text-xs font-medium text-rose-500',
    },
    gray: 'neutral',
    input: {
      base: 'font-semibold caret-main-300 relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0',
    },
    modal: {
      fullscreen: 'min-h-screen h-full',
      overlay: {
        background: 'dark:bg-gray-800/50',
      },
      padding: 'p-3 sm:p-0',
    },
    primary: 'main',
    slideover: {
      background: /*tw*/ 'dark:bg-gray-900 border-l border-gray-700',
      overlay: {
        background: 'dark:bg-gray-800/50',
      },
    },
    tooltip: {
      base: '[@media(pointer:coarse)]:block h-6 px-2 py-1 text-xs font-normal truncate relative',
      container: 'z-100 group',
    },
  },
})
