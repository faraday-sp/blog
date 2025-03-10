<template>
  <template
    v-for="(piece, index) in pieceList"
    :key="index"
  >
    <span
      v-if="piece.type === 'text'"
      :class="[$style.base, ...props.cl]"
      v-html="piece.value"
    ></span>
    <template v-else>
      <BaseIcon
        v-if="piece.key === 'icon' && isEmpty(slots.icon)"
        :cl="[$style.base, ...props.cl]"
        :name="parseIconParam(piece.param).name"
        :style="{
          verticalAlign: 'calc((var(--base-icon-size) * 10 / 100) * -1)',
          color: parseIconParam(piece.param).color,
        }"
      />
      <slot
        v-else
        :name="piece.key"
        :argument="piece.param"
      >
        ${{ piece.key }}
      </slot>
    </template>
  </template>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      cl?: PropsCl[]
      value: string
    }>(),
    {
      cl: () => [],
    },
  )
  const { t, te } = useLocale()
  const slots = useSlots()

  const pieceList = computed(() => {
    const valueTranslated = te(props.value) ? t(props.value) : props.value

    const PATTERN_ARGUMENT = /%\(([^)]+)\)s/g
    const DELIMITER = '%%argument%%'
    const componentInfo: {
      key: string
      param: string
      type: 'component'
    }[] = []
    const translateWithDelimiter = valueTranslated.replace(PATTERN_ARGUMENT, (_, rawKey) => {
      const key = rawKey.match(/^([^,]+)/)[0].trim()
      const param = rawKey.replace(/^([^,]+),/, '').trim()
      componentInfo.push({
        key,
        param,
        type: 'component',
      })
      return DELIMITER
    })

    const splitTranslate = translateWithDelimiter.split(new RegExp(`(${DELIMITER})`, 'g'))
    const result: (
      | {
          key: string
          param: string
          type: 'component'
        }
      | {
          type: 'text'
          value: string
        }
    )[] = []
    for (let i = 0; i < splitTranslate.length; i++) {
      const string = splitTranslate[i]
      if (string === '') {
        continue
      }

      if (string === DELIMITER) {
        result.push(componentInfo[0])
        componentInfo.shift()
      } else {
        result.push({
          type: 'text',
          value: string,
        })
      }
    }
    return result
  })
  function parseIconParam(value: string): { color?: string; name: IconName } {
    const splitedValue = value.split(',')

    return {
      color: splitedValue[1] ? splitedValue[1].trim() : undefined,
      name: splitedValue[0] ? (splitedValue[0].trim() as IconName) : 'logo-line',
    }
  }
</script>

<style lang="scss" module>
  .base {
    vertical-align: middle;
  }
</style>
