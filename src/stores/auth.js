import { defineStore } from 'pinia';
import { signOutUser } from '@/firebase'; // Impor fungsi signOutUser

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthScreenVisible: false,
    user: null,
    notification: null, // { message: String, type: String (e.g., 'error', 'success') }
  }),
  actions: {
    showAuthScreen() {
      this.isAuthScreenVisible = true;
    },
    hideAuthScreen() {
      this.isAuthScreenVisible = false;
    },
    setUser(userData) {
      this.user = userData;
    },
    async logout() {
      try {
        await signOutUser();
        this.setUser(null);
        this.setNotification('Anda berhasil logout.', 'success');
      } catch (error) {
        this.setNotification(`Gagal logout: ${error.message}`, 'error');
      }
    },
    setNotification(message, type = 'info') {
      this.notification = { message, type };
      // Hapus notifikasi setelah beberapa detik
      setTimeout(() => {
        this.clearNotification();
      }, 5000); // Notifikasi akan hilang setelah 5 detik
    },
    clearNotification() {
      this.notification = null;
    },
  },
});
