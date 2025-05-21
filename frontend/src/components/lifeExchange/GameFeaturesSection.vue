<template>
  <div class="game-features-section">
    <!-- 黄色横线和标题 -->
    <div class="title-container">
      <div class="yellow-line"></div>
      <h2 class="section-title text-3xl text-center">{{ $t('components.lifeExchange.gameFeaturesSection.gameTitle') }}</h2>
    </div>

    <!-- 特色卡片 -->
    <div class="cards-container">
      <!-- 游戏特色卡片 -->
      <div class="feature-card">
        <div class="icon-container">
          <div class="green-circle-icon">
            <span class="icon-smile">😊</span>
          </div>
        </div>
        <h3 class="card-title">{{ $t('components.lifeExchange.gameFeaturesSection.featuresCardTitle') }}</h3>
        <ul class="feature-list">
          <li v-for="(item, index) in $t('components.lifeExchange.gameFeaturesSection.featuresList', [], { returnObjects: true })" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>

      <!-- 游戏价值卡片 -->
      <div class="feature-card">
        <div class="icon-container">
          <div class="green-circle-icon">
            <span class="icon-exclamation">❗</span>
          </div>
        </div>
        <h3 class="card-title">{{ $t('components.lifeExchange.gameFeaturesSection.valueCardTitle') }}</h3>
        <ul class="feature-list">
          <li v-for="(item, index) in $t('components.lifeExchange.gameFeaturesSection.valuesList', [], { returnObjects: true })" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
.game-features-section {
  margin-bottom: 30px;
}

.title-container {
  position: relative;
  margin-bottom: 40px;
  text-align: center;
}

.yellow-line {
  height: 4px;
  width: 60px;
  background-color: var(--warning-color); /* 黄色 */
  margin: 0 auto 20px;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--text-primary);
}

.cards-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.feature-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.icon-container {
  margin-bottom: 20px;
}

.green-circle-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #e8f5e9; /* 浅绿色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--success-color); /* 绿色 */
  font-size: 24px;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
}

.feature-list {
  list-style-type: disc;
  padding-left: 20px;
}

.feature-list li {
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .cards-container {
    grid-template-columns: 1fr;
  }
}
</style> 