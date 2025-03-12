<template>
  <svg
    :width="size && size[0]"
    :height="size && size[1]"
    :fill="color && color"
  >
    <title v-if="title">{{ title }}</title>
    <use :href="url"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  icon: string;
  size?: string[] | number[];
  color?: string;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: () => ['1em', '1em'],
});

const url = computed(() => {
  return `/public/icon/sprite.svg#${props.icon}`;
});
</script>
