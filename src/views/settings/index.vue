<template>
  <div class="settings-page">
    <h1>{{ t('page.settings.title') }}</h1>
    <p>{{ t('page.settings.description') }}</p>

    <div class="settings-section">
      <h2>{{ t('page.settings.language_section.title') }}</h2>
      <div class="language-select-container">
        <label for="language-select">{{ t('page.settings.language_section.select') }}</label>
        <select id="language-select" v-model="currentLocale">
          <option v-for="lang in availableLanguages" :key="lang.code" :value="lang.code">
            {{ lang.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useLanguageStore } from '@/stores/language';

const { t } = useI18n();
const languageStore = useLanguageStore();

const availableLanguages = ref([
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'en', name: 'English' },
]);

const currentLocale = computed({
  get: () => languageStore.locale,
  set: (newLocale) => {
    languageStore.setLocale(newLocale);
  }
});
</script>

<style scoped>
.settings-page {
  padding: 1rem;
  color: var(--text-primary);
  max-width: 800px;
  margin: 0 auto;
}
h1 {
  margin-bottom: 1rem;
}
h2 {
  font-size: 1.25rem;
  font-weight: 600;
}
.settings-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}
.language-select-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  padding: 1rem;
  background-color: var(--bg-secondary);
  border-radius: 8px;
}
label {
  font-weight: 500;
}
select {
  padding: 0.5rem 1rem;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  min-width: 150px;
  cursor: pointer;
  transition: border-color 0.2s ease;
}
select:focus {
  outline: none;
  border-color: var(--accent-color);
}
</style>
