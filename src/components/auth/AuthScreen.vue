<template>
  <div v-if="authStore.isAuthScreenVisible" class="auth-overlay" @click.self="close">
    <div class="auth-card">
      <button class="close-button" @click="close">&times;</button>
      
      <div class="form-container">
        <div class="auth-header">
          <img src="@/icons/logo/logo.png" alt="Logo" class="logo">
          <h2 class="title">Selamat Datang</h2>
          <p class="subtitle">Pilih metode masuk favorit Anda untuk melanjutkan.</p>
        </div>
  
        <div class="social-divider"><span>ATAU</span></div>

        <div class="social-buttons">
          <button class="social-button google" @click="socialLogin('google')">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12.5C5,8.75 8.36,5.73 12.19,5.73C15.19,5.73 17.5,6.7 17.5,6.7L19.43,4.72C19.43,4.72 16.56,2 12.19,2C6.42,2 2.03,6.8 2.03,12.5C2.03,18.2 6.42,23 12.19,23C17.96,23 22,18.72 22,12.5C22,11.93 21.78,11.1 21.35,11.1Z"/></svg>
            <span>Google</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { signInWithGoogle } from '@/firebase';

const authStore = useAuthStore();

const close = () => {
  authStore.hideAuthScreen();
};

const socialLogin = async (provider) => {
  authStore.clearNotification(); // Hapus notifikasi lama
  try {
    let userCredential;
    if (provider === 'google') {
      userCredential = await signInWithGoogle();
    } 

    if (userCredential && userCredential.user) {
      authStore.setUser(userCredential.user);
      authStore.hideAuthScreen();
      authStore.setNotification(`Login ${provider} berhasil!`, 'success');
    }
  } catch (error) {
    authStore.setNotification(`Login ${provider} gagal: ${error.message}`, 'error');
  }
};
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.auth-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg-overlay);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
  box-sizing: border-box;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}

.auth-card {
  width: 100%;
  max-width: 400px;
  background-color: var(--bg-primary);
  border-radius: 20px;
  box-shadow: 0 16px 50px rgba(0, 0, 0, 0.1);
  position: relative;
  padding: 2.5rem;
  box-sizing: border-box;
  border: 1px solid var(--border-color);
  animation: fadeInUp 0.5s ease-out forwards;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 36px;
  height: 36px;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.close-button:hover {
  background-color: var(--accent-color-translucent);
  color: var(--accent-color);
  transform: rotate(90deg) scale(1.1);
  border-color: var(--accent-color);
}

.auth-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.logo {
  width: 55px;
  height: 55px;
  margin: 0 auto 1rem auto;
  border-radius: 50%;
}

.title {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.subtitle {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
}

.social-divider {
  text-align: center;
  margin: 2rem 0;
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  position: relative;
}

.social-divider span {
  background-color: var(--bg-primary);
  padding: 0 1rem;
  position: relative;
  z-index: 1;
}

.social-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: var(--border-color);
  z-index: 0;
}

.social-buttons {
  display: flex;
  flex-direction: column;
  gap: 1.25rem; /* Increased gap for better spacing */
}

.social-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease-out;
}

.social-button svg {
    transition: transform 0.25s ease-out;
}

.social-button:hover {
  border-color: transparent;
}

.social-button:hover svg {
  transform: scale(1.2) rotate(-5deg);
}

.social-button.google:hover {
  background-color: #4285F4;
  box-shadow: 0 8px 20px -6px #4285f4a0;
  color: #fff;
}

.social-button.github:hover {
  background-color: #4285F4; /* Changed to Google's blue */
  box-shadow: 0 8px 20px -6px #4285f4a0; /* Changed to Google's shadow */
  color: #fff;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 2rem 1.5rem;
  }
  .title {
    font-size: 1.6rem;
  }
}
</style>