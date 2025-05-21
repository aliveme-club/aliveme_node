<template>
  <!-- Hero Section -->
  <section class="hero-section text-white">
    <div class="container mx-auto px-4 hero-content">
      <div class="hero-left fade-in">
        <h1 class="text-4xl md:text-6xl font-bold mb-4">{{ $t('components.lifeExchange.heroSection.title') }}</h1>
        <p class="text-xl md:text-2xl mb-6">{{ $t('components.lifeExchange.heroSection.subtitle') }}</p>
        <p class="text-lg mb-8">{{ $t('components.lifeExchange.heroSection.description') }}</p>
      </div>
      <div class="hero-right fade-in" style="animation-delay: 0.3s">
        <img 
          src="@/assets/images/life-exchange/game_rules.svg" 
          alt="交换人生 - 游戏规则流程图" 
          class="game-rules-img"
          @click="toggleFullscreen"
        >
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const toggleFullscreen = (event) => {
  const img = event.target;
  if (!document.fullscreenElement) {
    if (img.requestFullscreen) {
      img.requestFullscreen();
    } else if (img.webkitRequestFullscreen) { // Safari
      img.webkitRequestFullscreen();
    } else if (img.msRequestFullscreen) { // IE11
      img.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
};
</script>

<style scoped>
.hero-section {
  padding: 0;
  background: linear-gradient(to right, #56C271, #4A90E2); /* 从绿色到蓝色的渐变 */
  height: 550px; /* Unified height */
  overflow: hidden; /* Prevent content overflow */
  display: flex;
  align-items: center;
}

.hero-content {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.hero-left {
  width: 45%;
  padding-right: 20px;
}

.hero-right {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.game-rules-img {
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer; /* 添加手型光标 */
}

@media (max-width: 768px) {
  .hero-section {
    height: auto;
    min-height: 550px;
    padding: 4rem 0;
  }
  
  .hero-left, .hero-right {
    width: 100%;
  }
  
  .hero-left {
    margin-bottom: 40px;
    padding-right: 0;
  }
}
</style> 