<template>
  <a-flex horizontal class="links-container">
    <RouterLink
      v-for="link in links"
      :key="link.title"
      :to="link.to"
      :replace="link.replace"
      :activeClass="link.activeClass"
      :exactActiveClass="link.exactActiveClass"
      :custom="link.custom"
      class="link"
      >{{ link.title }}</RouterLink
    >
  </a-flex>
</template>

<script lang="ts" setup>
import { type RouterLinkProps } from 'vue-router';

interface Link extends RouterLinkProps {
  title: string;
}
interface Props {
  links: Link[];
}

withDefaults(defineProps<Props>(), {
  links: () => [],
});
</script>

<style lang="less" scoped>
.links-container {
  .link {
    .font-b();
    color: var(--primary-text-color);

    &.router-link-active {
      color: var(--secondary-text-color);
    }
  }
}
</style>
