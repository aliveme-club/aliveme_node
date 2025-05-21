<template>
  <!-- Game Introduction Section -->
  <div class="game-intro-section">
    <div class="intro-card">
      <h3 class="intro-title">{{ $t('components.lifeExchange.gameIntroSection.subtitle') }}</h3>
      <p class="intro-text">{{ $t('components.lifeExchange.gameIntroSection.introText1') }}</p>
      <p class="intro-text">{{ $t('components.lifeExchange.gameIntroSection.introText2') }}</p>
      
      <h3 class="intro-title participation-title">{{ $t('components.lifeExchange.gameIntroSection.participationTitle') }}</h3>
      <p class="intro-text">{{ $t('components.lifeExchange.gameIntroSection.participationText') }}</p>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
.game-intro-section {
  margin-top: 20px;
}

.intro-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.intro-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
}

.participation-title {
  margin-top: 30px;
}

.intro-text {
  margin-bottom: 16px;
  line-height: 1.6;
  color: var(--text-secondary);
}
</style> 