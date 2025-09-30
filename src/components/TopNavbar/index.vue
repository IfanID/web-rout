<template>
  <nav class="top-navbar">
    <div class="navbar-left">
      <img src="@/icons/logo/logo.png" alt="Logo" class="navbar-logo">
      <span class="website-name">{{ appName }}</span>
    </div>

    <!-- navbar-center dihapus -->

    <div class="navbar-right">
      <ThemeToggle /> <!-- ThemeToggle sekarang di kiri -->
      
      <div class="profile-dropdown-container" ref="dropdownContainer">
        <img 
          :src="authStore.user?.photoURL || '@/icons/profile.jpg'" 
          :alt="t('top_navbar.profile_menu.profile')" 
          class="profile-photo"
          @click="toggleDropdown"
        >

        <transition name="balloon">
          <div v-if="isOpen" class="dropdown-menu" @click="isOpen = false">
            <div class="dropdown-header">
              <img :src="authStore.user?.photoURL || '@/icons/profile.jpg'" :alt="t('top_navbar.profile_menu.profile')" class="header-profile-photo">
              <div class="user-info">
                <span class="user-name">{{ authStore.user?.displayName || t('top_navbar.profile_menu.user_name') }}</span>
                <span class="user-email">{{ authStore.user?.email || t('top_navbar.profile_menu.user_email') }}</span>
              </div>
            </div>
                          <div class="menu-item-group">
                          <router-link to="/profile" class="menu-item">
                            <span class="material-symbols-outlined menu-icon">person</span> <!-- Material Symbol for Profile -->
                            {{ t('top_navbar.profile_menu.profile') }}
                          </router-link>
                          <router-link to="/settings" class="menu-item">
                            <span class="material-symbols-outlined menu-icon">settings</span> <!-- Material Symbol for Settings -->
                            {{ t('top_navbar.profile_menu.settings') }}
                          </router-link>            </div>
            <div class="menu-item-group border-top">
              <div class="menu-item" @click="openAuthScreen" v-if="!authStore.user">
                <span class="material-symbols-outlined menu-icon">login</span> <!-- Material Symbol for Sign In -->
                {{ t('top_navbar.profile_menu.sign_in') }}
              </div>
              <div class="menu-item" @click="authStore.logout" v-else>
                <span class="material-symbols-outlined menu-icon">logout</span> <!-- Material Symbol for Sign Out -->
                {{ t('top_navbar.profile_menu.sign_out') }}
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import ThemeToggle from '@/components/ThemeToggle/index.vue';
import pkg from '../../../package.json';
import { useAuthStore } from '@/stores/auth';

const { t } = useI18n();
const appName = pkg.name;
const authStore = useAuthStore();

const isOpen = ref(false);
const dropdownContainer = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = (event) => {
  if (dropdownContainer.value && !dropdownContainer.value.contains(event.target)) {
    isOpen.value = false;
  }
};

const openAuthScreen = () => {
  authStore.showAuthScreen();
};

onMounted(() => {
  document.addEventListener('click', closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
});
</script>

<style scoped>
.top-navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem; /* Diubah agar rata di semua sisi */
  height: 60px;
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  width: 100%;
  box-sizing: border-box;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.navbar-logo {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.website-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--text-primary);
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.profile-dropdown-container {
  position: relative;
  cursor: pointer;
}

.profile-photo {
  height: 36px;
  width: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--accent-color);
  flex-shrink: 0;
  line-height: 1;
  display: block;
  aspect-ratio: 1 / 1;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 220px; /* Lebar menu ditingkatkan */
  overflow: hidden;
  z-index: 1001;
  display: flex;
  flex-direction: column;
}

.dropdown-header {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-secondary);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropdown-header:hover {
  background-color: var(--border-color); /* Efek hover */
}

.header-profile-photo {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 0.75rem;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: bold;
  color: var(--text-primary);
  font-size: 1rem; /* Ukuran font disesuaikan */
}

.user-email {
  font-size: 0.8rem; /* Ukuran font disesuaikan */
  color: var(--text-primary);
  opacity: 0.7;
}

.menu-item-group {
  padding: 0.5rem 0;
}

.menu-item-group.border-top {
  border-top: 1px solid var(--border-color);
}

.menu-item {
  padding: 0.75rem 1rem;
  color: var(--text-primary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: background-color 0.2s ease;
}

.menu-item:hover {
  background-color: var(--bg-secondary);
}

/* Hapus styling menu-icon karena Material Symbols memiliki styling sendiri */
/* .menu-icon {
  height: 20px;
  width: 20px;
  object-fit: contain;
} */

/* Animasi Balon */
.balloon-enter-active, .balloon-leave-active {
  transition: all 0.3s ease;
}

.balloon-enter-from, .balloon-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(-10px);
  transform-origin: top right;
}

.balloon-enter-to, .balloon-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}

@media (max-width: 768px) {
  .top-navbar {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
}
</style>