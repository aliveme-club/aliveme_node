<template>
  <div class="main-layout">
    <NavBar />
    <main class="main-content">
      <RouterView></RouterView>
    </main>
    <AppFooter />
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