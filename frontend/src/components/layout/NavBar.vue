<template>
  <el-header class="nav-bar">
    <div class="container flex-between">
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/images/aliveme/aliveme_logo.jpg" alt="ALiveMe Logo" class="logo-img">
          <h1>ALiveMe</h1>
        </router-link>
      </div>
      <div class="nav-items">
        <el-menu
          mode="horizontal"
          :ellipsis="false"
          class="nav-menu"
        >
          <el-menu-item index="1">
            <router-link to="/">{{ $t('components.layout.NavBar.home') }}</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/ohCard">{{ $t('components.layout.NavBar.ohCard') }}</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link to="/lifeExchange">{{ $t('components.layout.NavBar.lifeExchange') }}</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <router-link to="/womenUnlimited">{{ $t('components.layout.NavBar.womenUnlimited') }}</router-link>
          </el-menu-item>
        </el-menu>
        <LanguageSwitcher class="language-switcher" />
      </div>
    </div>
  </el-header>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from '../common/LanguageSwitcher.vue';

const { t } = useI18n();
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

.nav-items {
  display: flex;
  align-items: center;
}

.nav-menu {
  border-bottom: none;
}

.language-switcher {
  margin-left: 20px;
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
  
  .language-switcher {
    margin-right: 20px;
  }
}
</style> 