import { createApp, ref } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import './assets/styles/index.less'

import { i18n, userLanguage, loadLocaleMessages } from './shared/i18';

const app = createApp(App);

async function setup() {
  const isLoading = ref(true);

  app.config.globalProperties.$isLoadingApp = isLoading;

  app.use(i18n).use(router).use(Antd).mount('#app');

  const messages = await loadLocaleMessages(userLanguage);
  i18n.global.locale.value = userLanguage;
  i18n.global.setLocaleMessage(userLanguage, messages);
  isLoading.value = false;
}

setup().catch((error) => {
  console.error('Failed to setup the app:', error);
});
