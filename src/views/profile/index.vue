<template>
  <div class="profile-page">
    <!-- Cover Photo -->
    <div class="cover-photo">
      <img :src="coverPhotoUrl" alt="Cover Photo">
      <button class="change-cover-btn" @click="showCoverPhotoModal = true">
        <span class="material-symbols-outlined">photo_camera</span>
        Ganti Sampul
      </button>
    </div>

    <!-- Profile Header -->
    <div class="profile-header-card">
      <div class="profile-info-main">
        <img 
          :src="authStore.user?.photoURL || '@/icons/profile.jpg'" 
          alt="Foto Profil"
          class="profile-avatar"
        >
        <div class="profile-text">
          <h1 class="user-name">{{ authStore.user?.displayName || 'Nama Pengguna' }}</h1>
          <p class="user-email">{{ authStore.user?.email || 'email@example.com' }}</p>
        </div>
      </div>
      <div class="profile-header-actions">
        <button class="action-button primary">
          <span class="material-symbols-outlined">edit</span>
          Edit Profil
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="profile-content-grid">
      <!-- Left Panel: Details -->
      <div class="content-card">
        <h3 class="card-title">Detail Profil</h3>
        <ul class="details-list">
          <li>
            <span class="material-symbols-outlined">badge</span>
            <div>
              <strong>Nama Lengkap</strong>
              <p>{{ authStore.user?.displayName || 'Belum diatur' }}</p>
            </div>
          </li>
          <li>
            <span class="material-symbols-outlined">alternate_email</span>
            <div>
              <strong>Email</strong>
              <p>{{ authStore.user?.email || 'Belum diatur' }}</p>
            </div>
          </li>
          <li>
            <span class="material-symbols-outlined">calendar_month</span>
            <div>
              <strong>Tanggal Bergabung</strong>
              <p>{{ joinedDate }}</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Right Panel: Settings -->
      <div class="content-card">
        <h3 class="card-title">Pengaturan Akun</h3>
        <div class="settings-links">
          <a href="#" class="settings-item">
            <span class="material-symbols-outlined">security</span>
            Keamanan & Login
          </a>
          <a href="#" class="settings-item">
            <span class="material-symbols-outlined">notifications</span>
            Notifikasi
          </a>
          <a href="#" class="settings-item">
            <span class="material-symbols-outlined">lock</span>
            Privasi
          </a>
          <div class="settings-item danger" @click="handleLogout">
            <span class="material-symbols-outlined">logout</span>
            Keluar
          </div>
        </div>
      </div>
    </div>

    <!-- Cover Photo Modal -->
    <CoverPhotoModal 
      :show="showCoverPhotoModal" 
      @close="showCoverPhotoModal = false"
      @save-url="handleSaveCoverPhotoUrl"
      @save-file="handleSaveCoverPhotoFile"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import CoverPhotoModal from '@/components/Profile/CoverPhotoModal.vue';
import { saveUserCoverPhoto, getUserCoverPhoto } from '@/firebase';

const authStore = useAuthStore();
const router = useRouter();

const COVER_PHOTO_LOCAL_STORAGE_KEY = 'user_cover_photo';

const showCoverPhotoModal = ref(false);
const coverPhotoUrl = ref(localStorage.getItem(COVER_PHOTO_LOCAL_STORAGE_KEY) || 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=2070&auto=format&fit=crop'); // Default cover photo

const handleLogout = async () => {
  await authStore.logout();
  localStorage.removeItem(COVER_PHOTO_LOCAL_STORAGE_KEY); // Hapus dari local storage saat logout
  router.push('/'); // Arahkan ke halaman utama setelah logout
};

const handleSaveCoverPhotoUrl = async (url) => {
  if (!authStore.user || !authStore.user.displayName) {
    authStore.setNotification('Anda harus login dan memiliki nama tampilan untuk menyimpan foto sampul.', 'error');
    return;
  }
  try {
    await saveUserCoverPhoto(authStore.user.displayName, url);
    coverPhotoUrl.value = url;
    localStorage.setItem(COVER_PHOTO_LOCAL_STORAGE_KEY, url); // Simpan ke local storage
    authStore.setNotification('URL foto sampul berhasil disimpan!', 'success');
  } catch (error) {
    authStore.setNotification(`Gagal menyimpan URL foto sampul: ${error.message}`, 'error');
  }
};

const handleSaveCoverPhotoFile = async (file) => {
  if (!authStore.user || !authStore.user.displayName) {
    authStore.setNotification('Anda harus login dan memiliki nama tampilan untuk menyimpan foto sampul.', 'error');
    return;
  }
  try {
    // Untuk sementara, kita bisa membuat URL objek lokal untuk pratinjau
    const tempUrl = URL.createObjectURL(file);
    await saveUserCoverPhoto(authStore.user.displayName, tempUrl);
    coverPhotoUrl.value = tempUrl;
    localStorage.setItem(COVER_PHOTO_LOCAL_STORAGE_KEY, tempUrl); // Simpan ke local storage
    authStore.setNotification('Foto sampul berhasil diperbarui (sementara)!', 'success');
    authStore.setNotification('Penting: File ini tidak disimpan secara permanen tanpa backend storage.', 'info');
  } catch (error) {
    authStore.setNotification(`Gagal memperbarui foto sampul: ${error.message}`, 'error');
  }
};

const loadCoverPhoto = async (user) => {
  if (!user || !user.displayName) {
    // Jika pengguna tidak login atau tidak memiliki displayName, jangan lakukan apa-apa.
    // coverPhotoUrl akan mempertahankan nilai dari local storage atau default awal.
    return;
  }
  try {
    const savedUrl = await getUserCoverPhoto(user.displayName);
    if (savedUrl) {
      coverPhotoUrl.value = savedUrl;
      localStorage.setItem(COVER_PHOTO_LOCAL_STORAGE_KEY, savedUrl); // Perbarui local storage dengan data Firestore
    } else {
      // Jika tidak ada di Firestore, pastikan local storage juga bersih dan kembali ke default
      coverPhotoUrl.value = 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=2070&auto=format&fit=crop';
      localStorage.removeItem(COVER_PHOTO_LOCAL_STORAGE_KEY);
    }
  } catch (error) {
    console.error('Error memuat foto sampul:', error);
    authStore.setNotification('Gagal memuat foto sampul.', 'error');
  }
};

// Hanya panggil loadCoverPhoto ketika authStore.user berubah
watch(() => authStore.user, (newUser) => {
  loadCoverPhoto(newUser);
}, { immediate: true }); // Panggil segera saat komponen dimount

const joinedDate = computed(() => {
  if (authStore.user?.metadata?.creationTime) {
    return new Date(authStore.user.metadata.creationTime).toLocaleDateString('id-ID', {
      day: 'numeric', 
      month: 'long', 
      year: 'numeric'
    });
  }
  return 'Tidak diketahui';
});
</script>

<style scoped>
.profile-page {
  background-color: var(--bg-secondary);
  min-height: calc(100vh - 60px);
}

.cover-photo {
  height: 250px;
  background-color: var(--border-color);
  position: relative;
}

.cover-photo:hover::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
  transition: background-color 0.3s ease;
}

.change-cover-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.9);
  color: #000;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.cover-photo:hover .change-cover-btn {
  opacity: 1;
  transform: translateY(0);
}

.cover-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-header-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  max-width: 900px;
  margin: -80px auto 0 auto;
  padding: 0 2rem;
  position: relative;
}

.profile-info-main {
  display: flex;
  align-items: flex-end;
  gap: 1.5rem;
}

.profile-avatar {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid var(--bg-primary);
  background-color: var(--bg-primary);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.profile-text {
  margin-bottom: 1.5rem;
}

.user-name {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.user-email {
  font-size: 1.1rem;
  color: var(--text-secondary);
}

.profile-header-actions .action-button {
  padding: 0.75rem 1.5rem;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.profile-header-actions .action-button:hover {
  background-color: var(--accent-color-dark);
}

.profile-content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.content-card {
  background-color: var(--bg-primary);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-top: 0;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-color);
}

.details-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.details-list li {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.details-list .material-symbols-outlined {
  font-size: 24px;
  color: var(--accent-color);
  margin-top: 4px;
}

.details-list strong {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 1rem;
}

.details-list p {
  margin: 0.25rem 0 0 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.settings-links {
  display: flex;
  flex-direction: column;
}

.settings-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem;
  border-radius: 8px;
  color: var(--text-primary);
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.settings-item:hover {
  background-color: var(--bg-secondary);
}

.settings-item .material-symbols-outlined {
  color: var(--text-secondary);
}

.settings-item.danger {
  color: #e53935;
}

.settings-item.danger:hover {
  background-color: #e539351a;
}

.settings-item.danger .material-symbols-outlined {
  color: #e53935;
}

@media (max-width: 768px) {
  .profile-content-grid {
    grid-template-columns: 1fr;
  }
  .profile-header-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: -100px;
  }
  .profile-text {
    margin-bottom: 1rem;
  }
  .profile-header-actions {
    margin-top: 1rem;
  }
  .user-name {
    font-size: 2rem;
  }
}
</style>