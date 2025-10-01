<template>
  <div class="settings-container">
    <header class="page-header">
      <h1 class="page-title">Uji Coba & Kustomisasi Notifikasi</h1>
      <p class="page-description">Pilih jenis, tulis pesan, ubah warna, dan lihat hasilnya secara langsung.</p>
    </header>

    <div class="panel">
      <div class="form-grid">
        <!-- Notification Type Selector -->
        <div class="form-group">
          <label for="notification-type">Jenis Notifikasi</label>
          <select id="notification-type" v-model="selectedType" class="control-select">
            <option v-for="type in notificationTypes" :key="type" :value="type">
              {{ type.charAt(0).toUpperCase() + type.slice(1) }}
            </option>
          </select>
        </div>

        <!-- Notification Message Input -->
        <div class="form-group message-group">
          <label for="notification-message">Pesan</label>
          <input id="notification-message" type="text" v-model="message" class="control-input" placeholder="Tulis pesan yang ingin diuji...">
        </div>

        <!-- Dynamic Background Color Picker -->
        <div class="form-group color-group">
          <label for="notification-bg-color">Latar</label>
          <input id="notification-bg-color" type="color" v-model="selectedBgColor" class="color-input">
        </div>

        <!-- Dynamic Text Color Picker -->
        <div class="form-group color-group">
          <label for="notification-text-color">Teks</label>
          <input id="notification-text-color" type="color" v-model="selectedTextColor" class="color-input">
        </div>
      </div>

      <div class="action-row">
        <button @click="showTestNotification" class="btn btn-primary" :style="{ backgroundColor: selectedBgColor, color: selectedTextColor }">
          Uji Coba Notifikasi
        </button>
        <button @click="resetColors" class="btn btn-secondary">
          Reset Warna
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useNotificationStore } from '@/stores/notification';
import { useThemeStore } from '@/stores/theme';

const notificationStore = useNotificationStore();
const themeStore = useThemeStore();

const defaultColors = {
  info: { background: '#2196F3', text: '#FFFFFF' },
  success: { background: '#4CAF50', text: '#FFFFFF' },
  warning: { background: '#FFC107', text: '#333333' },
  error: { background: '#F44336', text: '#FFFFFF' },
};

const notificationTypes = Object.keys(themeStore.notificationColors);
const selectedType = ref('info');
const message = ref('Ini adalah contoh pesan notifikasi.');

// Computed property for the background color
const selectedBgColor = computed({
  get: () => themeStore.notificationColors[selectedType.value].background,
  set: (newValue) => {
    themeStore.notificationColors[selectedType.value].background = newValue;
  }
});

// Computed property for the text color
const selectedTextColor = computed({
  get: () => themeStore.notificationColors[selectedType.value].text,
  set: (newValue) => {
    themeStore.notificationColors[selectedType.value].text = newValue;
  }
});

const showTestNotification = () => {
  if (!message.value.trim()) {
    notificationStore.setNotification({
      message: 'Pesan tidak boleh kosong!',
      type: 'error'
    });
    return;
  }

  notificationStore.setNotification({
    message: message.value,
    type: selectedType.value
  });
};

const resetColors = () => {
  for (const type in defaultColors) {
    themeStore.notificationColors[type].background = defaultColors[type].background;
    themeStore.notificationColors[type].text = defaultColors[type].text;
  }
};

</script>

<style scoped>
.settings-container {
  padding: 2rem;
  max-width: 900px;
  margin: 2rem auto;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.page-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
}

.panel {
  background-color: var(--bg-secondary);
  border-radius: 12px;
  padding: 2rem 2.5rem;
  border: 1px solid var(--border-color);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 3fr 0.5fr 0.5fr;
  gap: 1.5rem;
  align-items: flex-end;
  margin-bottom: 2.5rem;
}

.form-group label {
  font-weight: 500;
  margin-bottom: 0.75rem;
  display: block;
}

.control-select, .control-input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.control-select:focus, .control-input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px var(--accent-color-light);
}

.color-group {
  text-align: center;
}

.color-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 48px;
  height: 48px;
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.color-input::-webkit-color-swatch {
  border-radius: 8px;
  border: 1px solid var(--border-color);
}
.color-input::-moz-color-swatch {
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.action-row {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  width: 100%;
  padding: 1rem;
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  color: white;
}

.btn-primary:hover { filter: brightness(1.1); }

.btn-secondary {
  background-color: transparent;
  border-color: var(--border-color);
  color: var(--text-secondary);
}

.btn-secondary:hover {
  background-color: var(--bg-tertiary);
  border-color: var(--accent-color);
  color: var(--text-primary);
}

/* Responsive */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    align-items: stretch;
  }
  .message-group {
    grid-column: 1 / -1; /* Span full width */
  }
}
</style>
