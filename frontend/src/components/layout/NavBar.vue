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
        <!-- 汉堡按钮，仅在移动端显示 -->
        <el-tooltip content="菜单" placement="bottom">
          <el-button
            class="hamburger"
            @click="drawerVisible = true"
            circle
            v-show="isMobile"
          >
            <svg width="28" height="28" viewBox="0 0 1024 1024" fill="currentColor">
              <rect x="192" y="256" width="640" height="80" rx="40"/>
              <rect x="192" y="472" width="640" height="80" rx="40"/>
              <rect x="192" y="688" width="640" height="80" rx="40"/>
            </svg>
          </el-button>
        </el-tooltip>
      </div>
    </div>
    <!-- Drawer 侧边栏菜单 -->
    <el-drawer
      v-model="drawerVisible"
      direction="ltr"
      size="200px"
      :with-header="false"
    >
      <el-menu
        mode="vertical"
        :default-active="activeIndex"
        @select="handleMenuSelect"
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
    </el-drawer>
  </el-header>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from '../common/LanguageSwitcher.vue';
import { ref, computed, onMounted, onUnmounted } from 'vue';

const { t } = useI18n();

const drawerVisible = ref(false);
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});

function handleMenuSelect() {
  drawerVisible.value = false; // 选中后关闭菜单
}
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

.hamburger {
  display: none;
  background: var(--primary-color, #409EFF);
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  border-radius: 50%;
  border: none;
  transition: transform 0.2s;
}
.hamburger:hover {
  transform: scale(1.1);
  background: #337ecc;
}

@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .language-switcher {
    margin-right: 20px;
  }
  .hamburger {
    display: inline-flex;
    margin-right: 20px;
  }
}
</style> 