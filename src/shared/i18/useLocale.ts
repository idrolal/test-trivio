import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

export function useLoadLocale(fileName: string): void {
  const { locale, mergeLocaleMessage } = useI18n();
  onMounted(async () => {
    const file = await import(`../../locales/${locale.value}/${fileName}.json`);
    mergeLocaleMessage(locale.value, file.default);
  });
}
