<template>
  <section class="section">
    <div class="container mx-auto px-4">
      <!-- 标题和简介部分 -->
      <div class="title-section fade-in" style="animation-delay: 0.1s">
        <div class="title-container">
          <div class="yellow-line"></div>
          <h2 class="section-title text-3xl">{{ $t('components.ohCard.ohCardIntroduction.subtitle') }}</h2>
        </div>
        
        <div class="introduction-card">
          <p class="mb-4">{{ $t('components.ohCard.ohCardIntroduction.description') }}</p>
        </div>
        
        <!-- 连接线和箭头 -->
        <div class="connector-container">
          <div class="connector left-connector">
            <div class="arrow-down"></div>
          </div>
          <div class="connector right-connector">
            <div class="arrow-down"></div>
          </div>
        </div>
      </div>

      <!-- 特点和场景部分 -->
      <div class="features-container">
        <!-- 左侧：主要特点 -->
        <div class="feature-card left-feature fade-in" style="animation-delay: 0.2s">
          <div class="card-icon-wrapper">
            <el-icon :size="32"><Opportunity /></el-icon>
          </div>
          <h3 class="text-xl font-bold mb-4 text-center">{{ $t('components.ohCard.ohCardIntroduction.mainFeatures.title') }}</h3>
          <ul class="list-disc pl-6 mb-4">
            <li v-for="(item, index) in $t('components.ohCard.ohCardIntroduction.mainFeatures.items', [], { returnObjects: true })" :key="index" class="mb-2">
              {{ item }}
            </li>
          </ul>
        </div>

        <!-- 右侧：使用场景 -->
        <div class="feature-card right-feature fade-in" style="animation-delay: 0.3s">
          <div class="card-icon-wrapper">
            <el-icon :size="32"><Avatar /></el-icon>
          </div>
          <h3 class="text-xl font-bold mb-4 text-center">{{ $t('components.ohCard.ohCardIntroduction.usageScenarios.title') }}</h3>
          <ul class="list-disc pl-6 mb-4">
            <li v-for="(item, index) in $t('components.ohCard.ohCardIntroduction.usageScenarios.items', [], { returnObjects: true })" :key="index" class="mb-2">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <!-- 底部补充内容 -->
      <div class="card p-6 fade-in mt-8" style="animation-delay: 0.4s">
        <p>{{ $t('components.ohCard.ohCardIntroduction.conclusion') }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { Opportunity, Avatar } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// 监听滚动，添加动画
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el)
  })
})
</script>

<style scoped>
.section {
  padding: 5rem 0;
}

/* 标题和简介样式 */
.title-section {
  max-width: 800px;
  margin: 0 auto 5rem;
  position: relative;
}

.title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.yellow-line {
  height: 4px;
  width: 60px;
  background-color: var(--yellow, #F39C12);
  margin-bottom: 15px;
}

.section-title {
  font-weight: 700;
  color: var(--text-dark, #333);
  text-align: center;
}

.introduction-card {
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-size: 1.1rem;
  line-height: 1.7;
  border-left: 4px solid var(--yellow, #F39C12);
  border-right: 4px solid var(--green, #2ECC71);
}

/* 连接线和箭头样式 */
.connector-container {
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 50px;
  margin-top: 20px;
}

.connector {
  position: relative;
  height: 100%;
  width: 30%;
}

.left-connector::after {
  content: '';
  position: absolute;
  top: 0;
  left: 40%;
  width: 2px;
  height: 100%;
  background-color: var(--yellow, #F39C12);
}

.right-connector::after {
  content: '';
  position: absolute;
  top: 0;
  right: 40%;
  width: 2px;
  height: 100%;
  background-color: var(--green, #2ECC71);
}

.arrow-down {
  position: absolute;
  bottom: -5px;
  left: 40%;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
}

.left-connector .arrow-down {
  border-top: 8px solid var(--yellow, #F39C12);
  transform: translateX(-50%);
}

.right-connector .arrow-down {
  border-top: 8px solid var(--green, #2ECC71);
  right: 40%;
  left: auto;
  transform: translateX(50%);
}

/* 特点和场景并列容器 */
.features-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: stretch;
  gap: 80px; /* 增加两个卡片之间的间距 */
  margin-bottom: 2rem;
  flex-wrap: nowrap;
  max-width: 1000px;
  margin: 0 auto;
}

.feature-card {
  flex: 1;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 250px;
  max-width: 400px;
}

.left-feature {
  border-top: 4px solid var(--yellow, #F39C12);
}

.right-feature {
  border-top: 4px solid var(--green, #2ECC71);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  max-width: 1000px;
  margin: 3rem auto 0;
  text-align: center;
  font-style: italic;
  color: #555;
}

.card-icon-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #e8f5e9;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px;
  color: var(--green, #2ECC71);
  transition: all 0.3s ease;
}

.left-feature .card-icon-wrapper {
  background-color: #FFF3E0;
  color: var(--yellow, #F39C12);
}

.feature-card:hover .card-icon-wrapper {
  transform: scale(1.1);
}

.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.8s ease-out forwards;
  animation-play-state: paused;
}

.fade-in.visible {
  animation-play-state: running;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .features-container {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
  
  .feature-card {
    width: 100%;
    max-width: 100%;
  }
  
  .section {
    padding: 3rem 0;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .introduction-card {
    padding: 1.5rem;
    font-size: 1rem;
  }
  
  .connector-container {
    display: none; /* 在移动设备上隐藏连接线 */
  }
}
</style> 