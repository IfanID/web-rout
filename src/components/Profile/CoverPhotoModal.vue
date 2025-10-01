<template>
  <transition name="modal-fade">
    <div class="modal-overlay" v-if="show" @click.self="closeModal">
      <div class="modal-container">
        <button class="close-button" @click="closeModal">&times;</button>
        <h3 class="modal-title">Ganti Foto Sampul</h3>

        <transition name="slide-fade" mode="out-in">
          <div class="modal-content" :key="mode">
            <!-- Initial Choice -->
            <div v-if="mode === 'initial'" class="initial-choice-section">
              <button class="action-button primary" @click="mode = 'url'">
                Gunakan URL Gambar
              </button>
              <button class="action-button primary" @click="mode = 'file'">
                Unggah dari Galeri
              </button>
            </div>

            <!-- Opsi 1: Gunakan URL Gambar -->
            <div v-else-if="mode === 'url'" class="option-section">
              <h4>Tempel URL gambar di sini</h4>
              <input 
                type="text" 
                v-model="imageUrl"
                placeholder="https://example.com/gambar.jpg"
                class="url-input"
              >
              <div class="button-group">
                <button class="action-button" @click="mode = 'initial'">Kembali</button>
                <button class="action-button primary" @click="saveImageUrl">Simpan URL</button>
              </div>
            </div>

            <!-- Opsi 2: Unggah dari Galeri -->
            <div v-else-if="mode === 'file'" class="option-section">
              <h4>Pilih file gambar dari perangkat Anda</h4>
              <input 
                type="file" 
                ref="fileInput"
                @change="handleFileChange"
                accept="image/*"
                class="file-input"
              >
              <button 
                class="action-button"
                @click="triggerFileInput"
              >
                <span class="material-symbols-outlined">upload</span>
                Pilih File
              </button>
              <p v-if="selectedFile" class="selected-file-name">File terpilih: {{ selectedFile.name }}</p>
              <div class="button-group">
                <button class="action-button" @click="mode = 'initial'">Kembali</button>
                <button 
                  class="action-button primary"
                  @click="saveFile"
                  :disabled="!selectedFile"
                >
                  Unggah & Simpan
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(['close', 'save-url', 'save-file']);

const imageUrl = ref('');
const selectedFile = ref(null);
const fileInput = ref(null);
const mode = ref('initial'); // 'initial', 'url', 'file'

const closeModal = () => {
  emit('close');
  // Reset state saat modal ditutup
  imageUrl.value = '';
  selectedFile.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
  mode.value = 'initial'; // Reset mode
};

const saveImageUrl = () => {
  if (imageUrl.value) {
    emit('save-url', imageUrl.value);
    closeModal();
  }
};

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const saveFile = () => {
  if (selectedFile.value) {
    emit('save-file', selectedFile.value);
    closeModal();
  }
};

// Reset input saat modal dibuka/ditutup
watch(() => props.show, (newVal) => {
  if (!newVal) {
    imageUrl.value = '';
    selectedFile.value = null;
    if (fileInput.value) {
      fileInput.value.value = '';
    }
    mode.value = 'initial'; // Reset mode
  }
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
}

.modal-container {
  background-color: var(--bg-primary);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 500px;
  position: relative;
  animation: zoomIn 0.3s ease-out;
  border: 1px solid var(--border-color);
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.close-button:hover {
  color: var(--accent-color);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  text-align: center;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.initial-choice-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

.option-section {
  background-color: var(--bg-secondary);
  padding: 1.2rem;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.option-section h4 {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.1rem;
}

.url-input, .file-input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1rem;
  box-sizing: border-box;
}

.url-input:focus, .file-input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 2px var(--accent-color-translucent);
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button:hover:not(:disabled) {
  background-color: var(--bg-secondary);
  border-color: var(--accent-color);
}

.action-button.primary {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  color: #fff;
}

.action-button.primary:hover:not(:disabled) {
  background-color: var(--accent-color-dark);
  border-color: var(--accent-color-dark);
}

.action-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.selected-file-name {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-top: -0.5rem;
  text-align: center;
}

.divider {
  text-align: center;
  color: var(--text-secondary);
  font-weight: 600;
  position: relative;
  margin: 0.5rem 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: var(--border-color);
  z-index: 0;
}

.divider span {
  background-color: var(--bg-primary);
  padding: 0 1rem;
  position: relative;
  z-index: 1;
}

/* Modal Transitions */
@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}</style>