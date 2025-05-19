<template>
  <el-header class="nav-bar">
    <div class="container flex-between">
      <div class="logo">
        <router-link to="/">
          <img src="../../assets/images/aliveme/aliveme logo.jpg" alt="ALiveMe Logo" class="logo-img">
          <h1>ALiveMe</h1>
        </router-link>
      </div>
      <el-menu
        mode="horizontal"
        :ellipsis="false"
        class="nav-menu"
      >
        <el-menu-item index="1">
          <router-link to="/">首页</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/oh-card">OH卡</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link to="/life-exchange">交换人生</router-link>
        </el-menu-item>
        <el-menu-item index="4">
          <router-link to="/women-unlimited">无界女性</router-link>
        </el-menu-item>
      </el-menu>
    </div>
  </el-header>
</template>

<script setup>
// 导航栏逻辑
</script>

<style scoped>
.nav-bar {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.logo {
  padding: 0 20px;
}

.logo a {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-img {
  height: 32px;
  margin-right: 8px;
}

.logo h1 {
  margin: 0;
  font-size: 24px;
  color: var(--primary-color);
}

.nav-menu {
  border-bottom: none;
}

:deep(.el-menu-item) {
  font-size: 16px;
}

:deep(.el-menu-item a) {
  text-decoration: none;
  color: inherit;
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
}
</style> 