<template>
  <div :class="[style.base, style[props.mod], ...props.cl]">
    <nav
      ref="navRef"
      :class="style.nav"
    >
      <component
        :is="getTab(item)"
        v-for="(item, index) in props.list"
        ref="listRef"
        :key="index"
        :to="item.to"
        :[getTabClass(item)]="[style.tab, checkActive(index) && style.activeTab]"
        @click="setActive(item.id)"
      >
        <UIcon
          size="xl"
          class="w-5 h-5"
          :name="item.icon || ''"
        />
        <slot
          name="tab"
          :tab="item"
        >
          {{ item.title }}
        </slot>
      </component>
      <div
        v-if="activeIndex >= 0"
        data-name="TabListRoller"
        :class="style.roller"
        :style="rollerAttrStyle"
      ></div>
      <hr :class="style.track" />
    </nav>
    <slot />
  </div>
</template>

<script lang="ts" setup generic="T extends BaseTabListItem">
  import type { ConcreteComponent } from 'vue'

  import style from './style.module.scss'

  type Mod = 'default' | 'fullTab' | 'highlightedTab'
  const props = withDefaults(
    defineProps<{
      activeIndex?: number
      cl?: PropsCl[]
      list: T[]
      mod?: Mod
      onTabChange?: (id: string) => void
    }>(),
    {
      activeIndex: 0,
      cl: () => [],
      mod: 'default',
      onTabChange: () => undefined,
    },
  )
  const route = useRoute()
  const { getRealPath } = useLocale()

  const tabSizeList = ref<number[]>([])
  const listGap = ref(0)
  const listRef = ref<HTMLDivElement[] | InstanceType<BaseLink>[] | null>(null)
  const navRef = ref<HTMLDivElement | null>(null)
  const rollerStyle = reactive({
    offset: 0,
    width: 0,
  })
  const config = useRuntimeConfig()
  const rollerAttrStyle = computed(() => {
    return getName(config) === 'prime'
      ? {
          transform: `translateX(${rollerStyle.offset}px) translateY(-50%)`,
          width: `${rollerStyle.width}px`,
        }
      : {
          transform: `translateX(${rollerStyle.offset}px)`,
          width: `${rollerStyle.width}px`,
        }
  })
  const activeId = ref<string>(props.list[props.activeIndex].id || getRealPath(route))
  provide('activeId', activeId)
  const isTabRoute = computed(() => props.list.some((item) => item.to !== undefined))

  async function resizeHandler(): Promise<void> {
    await nextTick()
    syncRoller(true)
  }
  const navRefObserver = ref<ResizeObserver>()
  onMounted(() => {
    if (isTabRoute.value) {
      watch(
        () => route.path,
        () => {
          setActive(getRealPath(route))
        },
      )
    }
    setTimeout(() => {
      syncRoller()
    }, 200)
    navRefObserver.value = new ResizeObserver(resizeHandler)
    if (navRef.value) {
      navRefObserver.value.observe(navRef.value)
      listRef.value?.forEach((item) => {
        navRefObserver.value?.observe(isElement(item) ? item : item.linkRef?.$el)
      })
    }
  })
  onBeforeUnmount(() => {
    navRefObserver.value?.disconnect()
  })
  const activeIndex = computed(() =>
    props.list.findIndex((item) => item.id === activeId.value || item.to === activeId.value),
  )
  function checkActive(index: number): boolean {
    return activeIndex.value === index
  }
  function getTab(item: BaseTabListItem): ConcreteComponent | string {
    return item.to ? resolveComponent('BaseLink') : 'div'
  }

  function getTabClass(item: BaseTabListItem): string {
    return item.to ? 'cl' : 'class'
  }
  function setActive(id?: string): void {
    if (id) {
      activeId.value = id
      props.onTabChange(id)
    }
    if (activeIndex.value >= 0) {
      syncRoller()
    }
  }
  function syncRoller(force = false): void {
    if (!listRef.value || !navRef.value) {
      return
    }
    if (tabSizeList.value.length === 0 || force) {
      listGap.value = parseInt(getComputedStyle(navRef.value).gap)
      tabSizeList.value = []
      for (const item of listRef.value) {
        if (isElement(item)) {
          tabSizeList.value.push(item.offsetWidth)
        } else {
          tabSizeList.value.push(item.linkRef?.$el.offsetWidth)
        }
      }
    }
    const tabSizeListMini = tabSizeList.value.slice(0, activeIndex.value)
    rollerStyle.width = tabSizeList.value[activeIndex.value]
    rollerStyle.offset = tabSizeListMini.reduce((size, prevSize) => size + listGap.value + prevSize, 0)
  }

  watch(
    () => props.activeIndex,
    (newValue) => {
      setActive(`${props.list[newValue].id}`)
    },
  )
</script>
