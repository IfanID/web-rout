<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    
    <div class="dashboard-grid">
      <div class="dashboard-card">
        <h2>Statistik</h2>
        <p>Konten dashboard Anda</p>
      </div>
      
      <div class="dashboard-card">
        <h2>Grafik</h2>
        <p>Konten dashboard Anda</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  max-width: 1200px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
</style>