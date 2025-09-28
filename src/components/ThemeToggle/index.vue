<template>
  <button @click="toggleTheme" class="theme-toggle" :disabled="isTransitioning">
    {{ isDark ? '🌙 Dark Mode' : '☀️ Light Mode' }}
  </button>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const themeStore = useThemeStore();
const { isDark } = storeToRefs(themeStore);
const isTransitioning = ref(false);

const toggleTheme = () => {
  // Mencegah klik berulang selama transisi
  if (isTransitioning.value) return;
  
  isTransitioning.value = true;
  themeStore.toggleTheme();
  
  // Reset flag setelah transisi selesai
  setTimeout(() => {
    isTransitioning.value = false;
  }, 300);
};
</script>

<style scoped>
.theme-toggle {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background: var(--bg-secondary);
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  background: var(--accent-color);
  color: white;
}

.theme-toggle:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>