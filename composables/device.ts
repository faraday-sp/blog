export function useDevice(): {
  copy: (value: string) => Promise<void>
} {
  const notify = useNotify()
  const { t } = useLocale()
  async function copy(value: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(value)
      notify.create({
        title: t('main.copy_success'),
      })
    } catch {
      notify.create({
        title: 'Error copy',
        type: 'error',
      })
    }
  }
  return {
    copy,
  }
}
