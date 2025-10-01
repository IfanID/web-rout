import { defineStore } from 'pinia';
import { signOutUser } from '@/firebase'; // Impor fungsi signOutUser
import { useNotificationStore } from './notification';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthScreenVisible: false,
    user: null,
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
      const notificationStore = useNotificationStore();
      try {
        await signOutUser();
        this.setUser(null);
        notificationStore.setNotification({ message: 'Anda berhasil logout.', type: 'success' });
      } catch (error) {
        notificationStore.setNotification({ message: `Gagal logout: ${error.message}`, type: 'error' });
      }
    },
  },
});
