<template>
  <div v-if="authStore.isAuthScreenVisible" class="auth-overlay" @click.self="close">
    <div class="auth-card">
      <button class="close-button" @click="close">&times;</button>
      
      <div class="form-container">
        <div class="auth-header">
          <img src="@/icons/logo/logo.png" alt="Logo" class="logo">
          <h2>{{ activeTab === 'login' ? 'Selamat Datang' : 'Buat Akun' }}</h2>
          <p>{{ activeTab === 'login' ? 'Masuk untuk melanjutkan ke proyek Anda.' : 'Satu langkah lagi untuk memulai.' }}</p>
        </div>

        <form @submit.prevent="activeTab === 'login' ? login() : register()">
          <div v-if="activeTab === 'register'" class="form-group">
            <label for="username">Nama Pengguna</label>
            <input id="username" type="text" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="email" required>
          </div>
          <div class="form-group">
            <label for="password">Kata Sandi</label>
            <input id="password" type="password" required>
          </div>
          
          <a href="#" class="forgot-password" v-if="activeTab === 'login'">Lupa Kata Sandi?</a>

          <button type="submit" class="submit-button">{{ activeTab === 'login' ? 'Masuk' : 'Daftar' }}</button>
        </form>

        <div class="social-divider"><span>Atau</span></div>

        <div class="social-buttons">
          <button class="social-button google" @click="socialLogin('google')">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12.5C5,8.75 8.36,5.73 12.19,5.73C15.19,5.73 17.5,6.7 17.5,6.7L19.43,4.72C19.43,4.72 16.56,2 12.19,2C6.42,2 2.03,6.8 2.03,12.5C2.03,18.2 6.42,23 12.19,23C17.96,23 22,18.72 22,12.5C22,11.93 21.78,11.1 21.35,11.1Z"/></svg>
            <span>Google</span>
          </button>
          <button class="social-button github" @click="socialLogin('github')">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.83,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"/></svg>
            <span>GitHub</span>
          </button>
        </div>

        <div class="toggle-auth">
          <p>
            {{ activeTab === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?' }}
            <a href="#" @click.prevent="toggleTab">{{ activeTab === 'login' ? 'Daftar' : 'Masuk' }}</a>
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const activeTab = ref('login'); // 'login' or 'register'

const close = () => {
  authStore.hideAuthScreen();
};

const toggleTab = () => {
  activeTab.value = activeTab.value === 'login' ? 'register' : 'login';
};

const login = () => {
  console.log('Melakukan login...');
};

const register = () => {
  console.log('Melakukan registrasi...');
};

const socialLogin = (provider) => {
  console.log(`Melakukan login dengan ${provider}...`);
};
</script>

<style scoped>
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
}

.auth-card {
  width: 100%;
  max-width: 400px;
  background-color: var(--bg-primary);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
  padding: 3rem 2.5rem;
  box-sizing: border-box;
}

.form-container {
  display: flex;
  flex-direction: column;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: var(--text-secondary);
  line-height: 1;
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  width: 50px;
  height: 50px;
  margin: 0 auto 1rem auto;
  border-radius: 50%;
}

.auth-header h2 {
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.auth-header p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
  color: var(--text-primary);
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px var(--accent-color-translucent);
}

.forgot-password {
  display: block;
  text-align: right;
  margin-top: -0.75rem;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
  color: var(--accent-color);
  text-decoration: none;
}

.submit-button {
  width: 100%;
  padding: 0.9rem;
  border: none;
  border-radius: 8px;
  background-color: var(--accent-color);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 0.5rem;
}

.submit-button:hover {
  background-color: var(--accent-color-dark);
}

.social-divider {
  text-align: center;
  margin: 1.5rem 0;
  color: var(--text-secondary);
  font-size: 0.85rem;
  position: relative;
}

.social-divider span {
  background-color: var(--bg-primary);
  padding: 0 0.5rem;
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
  flex-direction: row;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.social-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  flex: 1;
}

.social-button:hover {
  background-color: var(--border-color);
}

.social-button svg {
  width: 20px;
  height: 20px;
}

.toggle-auth {
  text-align: center;
  margin-top: 2rem;
  font-size: 0.95rem;
  color: var(--text-secondary);
}

.toggle-auth a {
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 600;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 2.5rem 1.5rem;
  }
}
</style>