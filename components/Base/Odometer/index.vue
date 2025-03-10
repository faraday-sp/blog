<template>
  <div
    :class="$style.base"
    data-name="BaseOdometer"
    :data-value="props.value"
  >
    <TransitionGroup name="baseOdometerAnimation">
      <div
        v-for="character in characterArray"
        :key="character.id"
        :style="{
          '--characterSize': character.value === ' ' ? `${0.2 * props.fontSize}px` : `${0.604 * props.fontSize}px`,
        }"
        :class="$style.digit"
      >
        <span
          v-if="typeof character.value === 'string'"
          :class="[$style.character, character.value === ' ' && $style.divide]"
          :style="{
            '--fontSizeCSS': fontSizeCSS,
          }"
        >
          {{ character.value }}
        </span>
        <BaseOdometerDigit
          v-else
          :digit="character.value"
          :duration="duration"
          :fontSize="fontSize"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      denominator?: number
      duration?: number
      fontSize?: number
      value: number
    }>(),
    {
      denominator: 2,
      duration: 700,
      fontSize: 14,
    },
  )
  const fontSizeCSS = computed(() => `${props.fontSize}px`)

  const blankCharacterArray = computed(() => {
    const absoluteValue = Math.abs(props.value) || 0

    const integerPart = formatNumber(Math.trunc(absoluteValue))

    const floatPart = getDigit(subFloat(absoluteValue, props.denominator)).padEnd(props.denominator, '0')

    const result = []
    if (props.value < 0) {
      result.push('-')
    }
    result.push(...integerPart.split('').map((digit) => (digit === ' ' ? ' ' : parseInt(digit))))
    if (props.denominator !== 0) {
      result.push('.')
      result.push(...floatPart.split('').map((digit) => parseInt(digit)))
    }

    return result
  })
  interface Character {
    id: string
    value: number | string
  }
  const characterArray = ref<Character[]>([])

  watch(
    blankCharacterArray,
    (newValue, prevValue) => {
      if (!prevValue) {
        characterArray.value = newValue.map((character) => ({
          id: uuid(),
          value: character,
        }))
        return
      }

      const newCharacterArray: Character[] = []

      const isInc = newValue.length > prevValue.length
      const differentLength = isInc ? newValue.length - prevValue.length : prevValue.length - newValue.length
      for (const index in newValue) {
        const newBlankChar = newValue[index]
        const indexPrevChar = isInc ? Number(index) - differentLength : Number(index) + differentLength
        const prevChar = characterArray.value[indexPrevChar]
        if (prevChar) {
          newCharacterArray.push({
            id: prevChar?.id,
            value: newBlankChar,
          })
          continue
        }
        newCharacterArray.push({
          id: uuid(),
          value: newBlankChar,
        })
      }

      characterArray.value = newCharacterArray
    },
    {
      immediate: true,
    },
  )
</script>

<style lang="scss" module>
  .base {
    display: flex;
    max-width: fit-content;
  }
  .divide {
    padding: 0 calc(var(--fontSizeCSS) / 10);
  }
  .character {
    font-size: var(--fontSizeCSS);
    line-height: 1;
  }

  :global {
    .baseOdometerAnimation {
      &-enter-active,
      &-leave-active {
        transform: scale(1);
        transition-property: opacity, transform, width;
        transition-timing-function: ease-in-out;
      }
      &-enter-active {
        transition-duration: 0.3s;
      }
      &-leave-active {
        transition-duration: 0.3s;
      }
      &-enter-to,
      &-leave-from {
        width: var(--characterSize);
      }
      &-enter-from,
      &-leave-to {
        transform: scale(0);
        opacity: 0;
        width: 0;
      }
    }
  }
</style>
