<template>
  <div class="log-viewer-container">
    <div class="log-header">
      <h1>Log Aplikasi</h1>
      <p>Tampilan interaktif untuk semua log sistem.</p>
    </div>

    <div class="controls">
      <div class="filter-group">
        <label for="level-filter">Filter Level:</label>
        <select id="level-filter" v-model="filterLevel">
          <option value="">Semua</option>
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
        </select>
      </div>
      <div class="search-group">
        <label for="search-filter">Cari Pesan:</label>
        <input id="search-filter" type="text" v-model="searchTerm" placeholder="Ketik untuk mencari..." />
      </div>
    </div>

    <div class="log-table-container">
      <table class="log-table">
        <thead>
          <tr>
            <th class="col-level">Level</th>
            <th class="col-message">Pesan</th>
            <th class="col-timestamp">Waktu</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedLogs.length === 0">
            <td colspan="3" class="no-logs">Tidak ada log yang cocok dengan kriteria.</td>
          </tr>
          <tr v-for="log in paginatedLogs" :key="log.id" :class="`log-level-${log.level}`">
            <td class="col-level">
              <span :class="`level-badge level-${log.level}`">{{ log.level }}</span>
            </td>
            <td class="col-message">{{ log.message }}</td>
            <td class="col-timestamp">{{ formatTimestamp(log.timestamp) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination-controls">
      <button @click="prevPage" :disabled="currentPage === 1">Sebelumnya</button>
      <span>Halaman {{ currentPage }} dari {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Berikutnya</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useLogStore } from '@/stores/log';

const logStore = useLogStore();

// State untuk filter dan pencarian
const filterLevel = ref('');
const searchTerm = ref('');

// State untuk paginasi
const currentPage = ref(1);
const itemsPerPage = ref(15);

// Logika untuk memfilter dan mencari log
const filteredLogs = computed(() => {
  return logStore.logs.filter(log => {
    const levelMatch = filterLevel.value ? log.level === filterLevel.value : true;
    const searchTermMatch = searchTerm.value ? log.message.toLowerCase().includes(searchTerm.value.toLowerCase()) : true;
    return levelMatch && searchTermMatch;
  });
});

// Logika untuk paginasi
const totalPages = computed(() => {
  return Math.ceil(filteredLogs.value.length / itemsPerPage.value);
});

const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredLogs.value.slice(start, end);
});

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

// Fungsi utilitas untuk memformat timestamp
function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: 'short',
  });
}
</script>

<style scoped>
.log-viewer-container {
  padding: 1.5rem;
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.log-header h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.log-header p {
  margin-bottom: 1.5rem;
  color: var(--text-secondary-color);
}

.controls {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  align-items: center;
}

.filter-group, .search-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.controls label {
  font-weight: bold;
}

.controls select, .controls input {
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid var(--border-color);
  background-color: var(--background-color-secondary);
  color: var(--text-primary-color);
}

.log-table-container {
  flex-grow: 1;
  overflow-y: auto;
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

.log-table {
  width: 100%;
  border-collapse: collapse;
}

.log-table th, .log-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.log-table th {
  background-color: var(--background-color-secondary);
  font-weight: bold;
}

.col-level { width: 100px; }
.col-timestamp { width: 200px; }

.no-logs {
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary-color);
  font-style: italic;
}

.level-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
}

.level-info {
  background-color: #3b82f6; /* blue-500 */
}

.level-warning {
  background-color: #f97316; /* orange-500 */
}

.level-error {
  background-color: #ef4444; /* red-500 */
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1.5rem;
  gap: 1rem;
}

.pagination-controls button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: var(--accent-color);
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.pagination-controls button:disabled {
  background-color: var(--border-color);
  cursor: not-allowed;
}

.pagination-controls button:not(:disabled):hover {
  background-color: var(--accent-color-dark);
}
</style>