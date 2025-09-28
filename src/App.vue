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
  </div>
</template>

<script setup>
// ThemeToggle tidak lagi diimpor di sini
import BottomNavbar from '@/components/BottomNavbar/index.vue'; // Import komponen BottomNavbar
import TopNavbar from '@/components/TopNavbar/index.vue'; // Import komponen TopNavbar
</script>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 60px; /* Tambahkan padding untuk navbar bawah */
}

.app-header {
  /* Styling untuk app-header, TopNavbar akan mengisi ini */
  /* Hapus padding, display, justify-content, align-items, border-bottom karena TopNavbar akan menanganinya */
  padding: 0; /* TopNavbar akan memiliki padding sendiri */
  display: block; /* TopNavbar akan mengatur display-nya sendiri */
  border-bottom: none; /* TopNavbar akan memiliki border-bottom sendiri */
  border-top: none; /* Pastikan tidak ada border atas */
}

.app-main {
  flex: 1;
  padding: 1rem;
}
</style>