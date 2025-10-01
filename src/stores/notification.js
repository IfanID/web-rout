import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notification: null, // { message: String, type: String (e.g., 'info', 'success') }
  }),
  actions: {
    setNotification(payload, type = 'info') {
      if (typeof payload === 'object' && payload !== null) {
        this.notification = { message: payload.message, type: payload.type };
      } else {
        this.notification = { message: payload, type };
      }
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
