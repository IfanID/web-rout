<template>
  <div class="app-container">
    <header class="app-header">
      <!-- ThemeToggle telah dipindahkan ke TopNavbar -->
      <TopNavbar /> <!-- Menggunakan komponen TopNavbar -->
    </header>
    
    <main class="app-main">
      <router-view />
    </main>

    <BottomNavbar /> <!-- Menggunakan komponen BottomNavbar -->

    <AuthScreen />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import BottomNavbar from '@/components/BottomNavbar/index.vue'; // Import komponen BottomNavbar
import TopNavbar from '@/components/TopNavbar/index.vue'; // Import komponen TopNavbar
import AuthScreen from '@/components/auth/AuthScreen.vue';
import { useLanguageStore } from '@/stores/language';

const languageStore = useLanguageStore();

onMounted(() => {
  languageStore.initializeLocale();
});
</script>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  /* padding-bottom dihapus karena BottomNavbar menggunakan position:fixed */
}

.app-header {
  /* Styling untuk app-header, TopNavbar akan mengisi ini */
  padding: 0;
  display: block;
  border-bottom: none;
  border-top: none;
}

.app-main {
  flex: 1;
  /* Padding atas & bawah untuk memberi ruang bagi navbar fixed */
  padding: 1rem 1rem 60px 1rem; /* 60px atas, 1rem Kiri/Kanan, 60px bawah */
}

/* Media Query untuk layar kecil (di bawah 768px) */
@media (max-width: 768px) {
  .app-main {
    /* Kurangi padding horizontal di layar kecil agar lebih lega */
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
}
</style>