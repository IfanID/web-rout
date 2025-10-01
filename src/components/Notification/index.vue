<template>
  <transition name="fade">
    <div v-if="notification" class="notification-container" :style="notificationStyle">
      <p :style="{ color: textColor }">{{ notification.message }}</p>
      <button @click="notificationStore.clearNotification()" class="close-button" :style="{ color: textColor }">&times;</button>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue';
import { useNotificationStore } from '@/stores/notification';
import { useThemeStore } from '@/stores/theme';

const notificationStore = useNotificationStore();
const themeStore = useThemeStore();
const notification = computed(() => notificationStore.notification);

const notificationColors = computed(() => {
  if (!notification.value) return { background: '#333', text: '#FFF' };
  return themeStore.notificationColors[notification.value.type] || { background: '#333', text: '#FFF' };
});

// Dynamically compute the background style
const notificationStyle = computed(() => ({
  backgroundColor: notificationColors.value.background,
}));

// Dynamically compute the text color
const textColor = computed(() => notificationColors.value.text);

</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 2000;
  max-width: 300px;
  word-break: break-word;
}

.notification-container p {
  margin: 0;
  flex-grow: 1;
  padding-right: 10px;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  margin-left: 10px;
}

/* Fade Transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>