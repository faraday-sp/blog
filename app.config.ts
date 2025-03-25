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
      compoundVariants: [
        {
          class:
            'text-(--text-neutral-400) bg-(--ui-bg-button-neutral) hover:bg-(--ui-bg-button-stroke-neutral)/70 disabled:bg-(--ui-bg-inverted) aria-disabled:bg-(--ui-bg-inverted) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--ui-bg-button-stroke-neutral)',
          color: 'neutral',
          variant: 'solid',
        },
      ],
      slots: {
        base: 'font-semibold',
      },
    },
    formGroup: {
      error: 'mt-1 text-xs font-medium text-rose-500',
    },
    gray: 'neutral',
    input: {
      base: [
        'w-full rounded-full border-0 placeholder:text-(--ui-text-dimmed) focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
        'transition-colors',
        'font-semibold caret-main-300',
      ],
      compoundVariants: [
        {
          class: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-(--ui-border-inverted) bg-(--ui-bg-button-neutral)',
          color: 'neutral',
          variant: 'outline',
        },
      ],
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
