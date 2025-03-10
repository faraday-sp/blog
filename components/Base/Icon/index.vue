<template>
  <div
    ref="baseRef"
    :class="[$style.base, ...props.cl]"
    :data-icon="props.name"
  >
    <Transition
      name="poof-fast"
      mode="out-in"
    >
      <div
        v-if="icon && icon !== 'NULL'"
        :class="[$style.icon]"
        v-html="icon"
      ></div>
      <BaseSkeleton
        v-else
        :cl="[$style.base, $style.skeleton]"
      />
    </Transition>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ cl?: PropsCl[]; name: IconName }>(), {
    cl: () => [],
  })

  const icon = ref('')
  const globalIconMap = useState<Record<string, Promise<string> | string>>('icons', () => ({}))
  watch(
    () => props.name,
    async () => {
      if (isEmpty(props.name)) {
        return
      }
      if (import.meta.client) {
        const cacheIcon = globalIconMap.value[props.name]

        if (cacheIcon) {
          if (isString(cacheIcon)) {
            icon.value = cacheIcon
            return
          }
          const response = await cacheIcon

          icon.value = response
          return
        }
        let deferredResolve: (value: string) => void = () => undefined
        globalIconMap.value[props.name] = new Promise<string>((resolve) => (deferredResolve = resolve))
        // try {
        //   const promiseImport = import(
        //     `../../../public/static-media-frontend/icon/${getName(config)}/${props.name}.svg?raw`
        //   )
        //   const iconString = (await promiseImport).default
        //   deferredResolve(iconString)
        //   globalIconMap.value[props.name] = iconString
        //   icon.value = iconString
        // } catch (error) {
        //   globalIconMap.value[props.name] = 'NULL'
        //   deferredResolve('NULL')
        // }

        try {
          const promiseResponse = fetch(`/static-media-frontend/icon/${props.name}.svg`, {
            cache: 'force-cache',
          })

          const response = await promiseResponse

          if (response.status !== 200) {
            globalIconMap.value[props.name] = 'NULL'
            deferredResolve('NULL')
            return
          }
          const iconString = await response.text()
          if (!/^<svg/.test(iconString)) {
            globalIconMap.value[props.name] = 'NULL'
            deferredResolve('NULL')
            return
          }
          deferredResolve(iconString)
          globalIconMap.value[props.name] = iconString
          icon.value = iconString
        } catch {
          globalIconMap.value[props.name] = 'NULL'
          deferredResolve('NULL')
        }
      }
    },
    {
      immediate: true,
    },
  )
  const baseRef = ref<HTMLDivElement>()
  defineExpose({ baseRef })

  if (import.meta.server && !isEmpty(props.name)) {
    if (globalIconMap.value[props.name]) {
      icon.value = await globalIconMap.value[props.name]
    }
    const rawIcon = (await import(`../../../public/static-media-frontend/icon/${props.name}.svg?raw`)).default

    globalIconMap.value[props.name] = rawIcon
    icon.value = rawIcon
  }
</script>

<style lang="scss" module>
  .base {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--base-icon-width, var(--base-icon-size, 20px));
    min-width: var(--base-icon-width, var(--base-icon-size, 20px));
    height: var(--base-icon-height, var(--base-icon-size, 20px));
    min-height: var(--base-icon-height, var(--base-icon-size, 20px));
    svg {
      width: 100%;
      height: 100%;
    }
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  .skeleton {
    border-radius: 5px;
  }
</style>
