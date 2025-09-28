import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import i18n from './i18n'; // Impor i18n
import './styles/theme/default.css';
import { useThemeStore } from './stores/theme.js'; // Tambahkan ini

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(i18n); // Gunakan i18n

// Tunggu hingga aplikasi dimount sebelum menginisialisasi tema
app.mount('#app');

// Inisialisasi tema setelah aplikasi dimount
setTimeout(() => {
  const themeStore = useThemeStore(pinia);
  themeStore.initTheme();
}, 0);