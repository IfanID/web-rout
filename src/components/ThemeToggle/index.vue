<template>
  <button 
    @click="toggleTheme" 
    class="theme-toggle-icon" 
    :aria-label="isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'"
  >
    <span class="material-symbols-outlined">
      {{ isDark ? 'dark_mode' : 'light_mode' }}
    </span>
  </button>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';

const themeStore = useThemeStore();
const { isDark } = storeToRefs(themeStore);

const toggleTheme = () => {
  themeStore.toggleTheme();
};
</script>

<style scoped>
.theme-toggle-icon {
  background-color: transparent;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%; /* Membuat tombol menjadi lingkaran */
  transition: background-color 0.2s ease;
}

.theme-toggle-icon:hover {
  background-color: var(--bg-secondary);
}

.material-symbols-outlined {
  font-size: 24px; /* Ukuran ikon standar */
}
</style>
