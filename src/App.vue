<script setup lang="ts">
import { type Theme } from '@/shared/theme/type.ts';
import MainLayout from './layouts/MainLayout.vue';
import { useRoute } from 'vue-router';
import {
  computed,
  defineAsyncComponent,
  onMounted,
  ref,
  type DefineComponent,
} from 'vue';

const route = useRoute();
const theme = ref<Theme>('light');

const layoutComponent = computed(() => {
  const routeLayout = route.meta?.layout;
  if (routeLayout) {
    return defineAsyncComponent({
      loader: routeLayout as () => Promise<DefineComponent>,
      delay: 200,
      timeout: 3000,
    });
  }
  return MainLayout;
});

onMounted(() => {
  loadTheme(theme.value);
});

const loadTheme = (theme: Theme) => {
  import(`./assets/theme/${theme}.less`)
    .then(() => {
      console.log(`${theme} theme loaded`);
    })
    .catch((error) => {
      console.error(`Failed to load ${theme} theme:`, error);
    });
};
</script>

<template>
  <div
    v-if="$isLoadingApp.value"
    class="loader"
    :style="{
      height: '100vh',
    }"
  >
    <span>Loading...</span>
  </div>
  <KeepAlive v-else>
    <component :is="layoutComponent"></component>
  </KeepAlive>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
