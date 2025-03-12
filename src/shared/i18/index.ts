import { createI18n } from 'vue-i18n';

export const userLanguage = (
  navigator.language || navigator.languages[0]
).split('-')[0];

export const i18n = createI18n({
  fallbackLocale: 'ru',
  legacy: false,
  messages: {},
});

export async function loadLocaleMessages(locale: string) {
  try {
    const context = await Promise.all([
      import(`../../locales/${locale}/common.json`),
    ]);
    return context.reduce(
      (messages, module) => ({ ...messages, ...module.default }),
      {}
    );
  } catch (error) {
    console.error(`Failed to load locale messages for ${locale}:`, error);
    return {};
  }
}
