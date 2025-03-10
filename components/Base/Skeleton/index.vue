<template>
  <div
    class="skeleton"
    :class="props.cl"
  ></div>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ cl?: PropsCl[] }>(), { cl: () => [] })
</script>

<style lang="scss">
  .skeleton {
    position: relative;
    background: rgba(221, 219, 221, 0.1);
    overflow: hidden;
    cursor: progress;
    &::after {
      position: absolute;
      inset: 0;
      --skeleton-color: 149, 149, 149;
      transform: translateX(-100%);
      background-image: linear-gradient(
        90deg,
        rgba(var(--skeleton-color), 0),
        rgba(var(--skeleton-color), 0.3),
        rgba(var(--skeleton-color), 0)
      );
      animation: shimmer 2s infinite;
      content: '';
    }
  }
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
</style>
