<template>
  <div class="page-container">
    <h1>{{ t('page.library.title') }}</h1>
    <p>{{ t('page.library.description') }}</p>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
.page-container {
  padding: 1rem;
}
</style>