import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthScreenVisible: false,
  }),
  actions: {
    showAuthScreen() {
      this.isAuthScreenVisible = true;
    },
    hideAuthScreen() {
      this.isAuthScreenVisible = false;
    },
  },
});
