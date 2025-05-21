<template>
  <div class="life-exchange-page">
    <hero-section />
    <div class="content-container">
      <game-features-section />
      <game-intro-section />
    </div>
  </div>
</template>

<script setup>
import HeroSection from '@/components/life-exchange/HeroSection.vue'
import GameFeaturesSection from '@/components/life-exchange/GameFeaturesSection.vue'
import GameIntroSection from '@/components/life-exchange/GameIntroSection.vue'
</script>

<style scoped>
.life-exchange-page {
  min-height: 100vh;
}

.content-container {
  padding: 40px 0;
  max-width: 1200px;
  margin: 0 auto;
}
</style> 