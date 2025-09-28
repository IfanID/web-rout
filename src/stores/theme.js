import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false,
    isInitialized: false, // Tambahkan flag untuk mencegah inisialisasi ganda
    systemMediaQuery: null, // Simpan referensi ke media query
  }),
  actions: {
    initTheme() {
      // Cek localStorage atau preferensi sistem
      const savedTheme = localStorage.getItem('theme');
      this.systemMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const systemPrefersDark = this.systemMediaQuery.matches;
      
      // Tambahkan listener untuk perubahan preferensi sistem
      this.systemMediaQuery.addEventListener('change', this.handleSystemThemeChange);
      
      // Jangan terapkan tema sebelum DOM siap
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          this.applyInitialTheme(savedTheme, systemPrefersDark);
        });
      } else {
        this.applyInitialTheme(savedTheme, systemPrefersDark);
      }
    },
    
    handleSystemThemeChange(e) {
      // Hanya ubah tema jika pengguna belum secara eksplisit memilih tema
      if (!localStorage.getItem('theme')) {
        this.isDark = e.matches;
        this.applyTheme();
      }
    },
    
    applyInitialTheme(savedTheme, systemPrefersDark) {
      // Hanya terapkan tema jika belum diinisialisasi
      if (!this.isInitialized) {
        this.isDark = savedTheme 
          ? savedTheme === 'dark' 
          : systemPrefersDark;
        
        this.applyTheme();
        this.isInitialized = true;
      }
    },
    
    toggleTheme() {
      this.isDark = !this.isDark;
      this.applyTheme();
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    },
    
    applyTheme() {
      // Hapus kelas dark terlebih dahulu untuk memastikan perubahan diterapkan
      document.documentElement.classList.remove('dark');
      
      // Gunakan setTimeout untuk memastikan browser memiliki waktu untuk menerapkan perubahan
      setTimeout(() => {
        document.documentElement.classList.toggle('dark', this.isDark);
      }, 0);
    },
    
    // Bersihkan listener saat store dihancurkan
    $dispose() {
      if (this.systemMediaQuery) {
        this.systemMediaQuery.removeEventListener('change', this.handleSystemThemeChange);
      }
    },
  },
});