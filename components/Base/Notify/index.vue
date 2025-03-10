<template>
  <div
    :class="[style.base, style[props.type]]"
    :style="{
      '--animationTimeProgress': `${props.duration}ms`,
    }"
  >
    <UIcon
      :class="[style.close]"
      name="i-heroicons-x-mark"
      @click="kill"
    />
    <div :class="[style.iconBox, style[`icon${capitalize(props.type)}`]]">
      <UIcon
        v-if="props.type === 'error'"
        :class="[style.icon]"
        name="i-nonicons-error-16"
      />
      <UIcon
        v-else-if="props.type === 'info'"
        :class="[style.icon]"
        name="i-nonicons-error-16"
      />
      <UIcon
        v-else
        :class="[style.icon]"
        name="i-icon-park-outline-check-one"
      />
    </div>
    <div :class="style.content">
      <h3
        v-if="!isEmpty(props.title)"
        :class="[style.title, !hasDescription && style.alone]"
      >
        <BaseTranslate :value="props.title" />
      </h3>
      <p
        v-if="hasDescription"
        :class="style.text"
      >
        <BaseTranslate :value="props.description" />
      </p>
    </div>
    <div
      ref="progressRef"
      :class="style.progress"
    ></div>
    <div :class="style.progressBg"></div>
  </div>
</template>

<script lang="ts" setup>
  import style from './style.module.scss'

  const props = withDefaults(
    defineProps<{
      description?: string
      duration?: number
      id: string
      title?: string
      type?: 'error' | 'info' | 'success'
    }>(),
    {
      description: '',
      duration: 5000,
      title: '',
      type: 'success',
    },
  )
  const progressRef = ref<HTMLDivElement | null>(null)
  const notify = useNotify()

  function kill(): void {
    notify.remove(props.id)
  }
  onMounted(() => {
    // if (props.type === 'success') {
    //   soundService.play('notifySuccess')
    // } else {
    //   soundService.play('notifyError')
    // }
    progressRef.value?.addEventListener('animationend', kill)
  })
  const hasDescription = computed(() => !isEmpty(props.description))
  onBeforeUnmount(() => {
    progressRef.value?.removeEventListener('animationend', kill)
  })
</script>
