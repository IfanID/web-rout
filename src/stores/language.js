import { defineStore } from 'pinia';
import i18n from '@/i18n';

export const useLanguageStore = defineStore('language', {
  state: () => ({
    locale: i18n.global.locale.value,
  }),
  actions: {
    setLocale(newLocale) {
      this.locale = newLocale;
      i18n.global.locale.value = newLocale;
      localStorage.setItem('language', newLocale);
      document.documentElement.lang = newLocale;
    },
    initializeLocale() {
      const savedLocale = localStorage.getItem('language');
      if (savedLocale && ['id', 'en'].includes(savedLocale)) {
        this.setLocale(savedLocale);
      } else {
        this.setLocale(i18n.global.locale.value);
      }
    }
  },
});
