<template>
  <nav class="bottom-navbar">
    <router-link to="/" class="nav-item">
      <span class="material-symbols-outlined nav-icon">home</span>
      <span class="nav-text">{{ t('navigation.home') }}</span>
    </router-link>
    <router-link to="/library" class="nav-item">
      <span class="material-symbols-outlined nav-icon">apps</span>
      <span class="nav-text">{{ t('navigation.library') }}</span>
    </router-link>
    <router-link to="/history" class="nav-item"> <!-- Rute diubah ke /history -->
      <span class="material-symbols-outlined nav-icon">history</span> <!-- Icon diubah ke 'history' -->
      <span class="nav-text">{{ t('navigation.history') }}</span>
    </router-link>
  </nav>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
.bottom-navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px; /* Tinggi navbar */
  background-color: var(--bg-primary); /* Gunakan variabel tema */
  border-top: 1px solid var(--border-color); /* Gunakan variabel tema */
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.nav-item {
  color: var(--text-primary); /* Gunakan variabel tema */
  text-decoration: none;
  padding: 0.5rem 0; /* Padding vertikal, horizontal 0 */
  border-radius: 5px;
  transition: background-color 0.3s ease;
  display: flex; /* Gunakan flexbox untuk ikon dan teks */
  flex-direction: column; /* Ikon di atas teks */
  align-items: center; /* Pusatkan secara horizontal */
  justify-content: center; /* Pusatkan secara vertikal */
  flex: 1; /* Agar item mengisi ruang yang tersedia */
  font-size: 0.75rem; /* Ukuran font teks navigasi */
}

.nav-item:hover {
  background-color: var(--bg-secondary); /* Gunakan variabel tema */
}

.nav-item.router-link-active {
  color: var(--accent-color); /* Gunakan variabel tema */
  font-weight: bold;
}

.nav-icon {
  font-size: 1.5rem; /* Ukuran ikon */
  margin-bottom: 0.2rem; /* Jarak antara ikon dan teks */
}

.nav-text {
  line-height: 1; /* Pastikan teks tidak memiliki spasi ekstra */
}
</style>