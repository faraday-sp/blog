<template>
  <div
    v-if="props.id === activeId"
    :class="props.cl"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ cl?: PropsCl[]; id: string }>(), {
    cl: () => [],
  })

  const activeId = inject('activeId')
</script>
