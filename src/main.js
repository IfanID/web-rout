import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import i18n from './i18n';
import './styles/theme/default.css';
import { useThemeStore } from './stores/theme.js';
import { auth, onAuthStateChanged } from './firebase'; // Impor auth dan onAuthStateChanged
import { useAuthStore } from './stores/auth'; // Impor auth store

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);

const authStore = useAuthStore(pinia);

// Listener untuk memantau perubahan status otentikasi
onAuthStateChanged(auth, (user) => {
  authStore.setUser(user);
  
  // Inisialisasi tema hanya setelah status auth terverifikasi
  // untuk memastikan pengalaman pengguna yang konsisten
  if (!themeStore) {
    const themeStore = useThemeStore(pinia);
    themeStore.initTheme();
  }
});

app.mount('#app');

// Inisialisasi tema dipindahkan ke dalam listener onAuthStateChanged
// untuk memastikan tema dimuat setelah status otentikasi diketahui.
let themeStore = null; // Definisikan di luar untuk akses