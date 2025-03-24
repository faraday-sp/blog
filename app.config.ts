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
      defaultVariants: {
        divider: 'i-heroicons-chevron-right-20-solid',
      },
      li: 'min-w-fit',
    },
    button: {
      color: {
        neutral: {
          ghost:
            'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-40 flex-shrink-0 font-semibold text-neutral-400 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hover:bg-neutral-800 disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400 inline-flex items-center',
          outline:
            'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-semibold ring-1 ring-inset ring-gray-600 text-neutral-600 dark:text-neutral-400 bg-neutral-800 hover:bg-neutral-800 disabled:bg-neutral-500 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400 inline-flex items-center',
          soft: 'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-semibold text-neutral-400 dark:text-neutral-400 bg-neutral-900 hover:bg-neutral-800 disabled:bg-neutral-500 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400 inline-flex items-center',
          solid:
            'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-semibold ring-1 ring-gray-600 text-neutral-600 dark:text-neutral-300 bg-neutral-800 dark:hover:bg-neutral-700 disabled:bg-neutral-500 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400 inline-flex items-center',
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

      variant: {
        outline: 'text-(--ui-text-highlighted) bg-(--ui-bg, #FF0000) ring ring-inset ring-[#FF0000]',
        soft: 'text-(--ui-text-highlighted) bg-(--ui-bg-elevated)/50 hover:bg-(--ui-bg-elevated) focus:bg-(--ui-bg-elevated) disabled:bg-(--ui-bg-elevated)/50',
        subtle: 'text-(--ui-text-highlighted) bg-(--ui-bg-elevated) ring ring-inset ring-(--ui-border-accented)',
        ghost: 'text-(--ui-text-highlighted) bg-transparent hover:bg-(--ui-bg-elevated) focus:bg-(--ui-bg-elevated) disabled:bg-transparent dark:disabled:bg-transparent',
        none: 'text-(--ui-text-highlighted) bg-transparent'
      },

      defaultVariants: {
        variant: 'outline'
      }
    },
    modal: {
      fullscreen: 'min-h-screen h-full',
      overlay: {
        background: 'dark:bg-neutral-800/50',
      },
      padding: 'p-3 sm:p-0',
    },
    primary: 'main',
    slideover: {
      background: /*tw*/ 'dark:bg-neutral-900 border-l border-gray-700',
      overlay: {
        background: 'dark:bg-neutral-800/50',
      },
    },
    tooltip: {
      base: '[@media(pointer:coarse)]:block h-6 px-2 py-1 text-xs font-normal truncate relative',
      container: 'z-100 group',
    },
  },
})
