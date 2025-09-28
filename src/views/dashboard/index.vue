<template>
  <div class="dashboard">
    <h1>{{ t('page.dashboard.title') }}</h1>
    
    <div class="dashboard-grid">
      <div class="dashboard-card">
        <h2>{{ t('page.dashboard.statistics') }}</h2>
        <p>{{ t('page.dashboard.content') }}</p>
      </div>
      
      <div class="dashboard-card">
        <h2>{{ t('page.dashboard.chart') }}</h2>
        <p>{{ t('page.dashboard.content') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
</style>