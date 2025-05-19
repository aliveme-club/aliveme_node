<template>
  <div class="main-layout">
    <nav-bar />
    <main class="main-content">
      <router-view></router-view>
    </main>
    <app-footer />
  </div>
</template>

<script setup>
import NavBar from './NavBar.vue'
import AppFooter from './AppFooter.vue'
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 20px 0;
}
</style> 