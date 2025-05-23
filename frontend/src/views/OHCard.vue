<template>
  <div class="oh-card-page">
    <!-- 英雄区域 -->
    <OHCardHero @start-experience="scrollToOhCardGame">
      <OHCardGame ref="ohCardGameRef" />
    </OHCardHero>

    <!-- 内容区域 -->
    <div class="content-container">
      <!-- OH卡流程 -->
      <OHCardProcess />

      <!-- OH卡介绍 -->
      <OHCardIntroduction />
    </div>

    <!-- 重抽确认模态框 -->
    <RedrawConfirmation 
      :show="showConfirmationModal" 
      @cancel="hideRedrawConfirmation" 
      @confirm="redrawCard" 
    />

    <!-- 图片预览使用原生DOM方法创建，不需要组件 -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import OHCardHero from '@/components/ohCard/OHCardGame/OHCardHero.vue'
import OHCardGame from '@/components/ohCard/OHCardGame/index.vue'
import OHCardProcess from '@/components/ohCard/OHCardGame/OHCardProcess.vue'
import OHCardIntroduction from '@/components/ohCard/OHCardGame/OHCardIntroduction.vue'
import RedrawConfirmation from '@/components/ohCard/OHCardModals/RedrawConfirmation.vue'
import useOHCard from '@/composables/useOHCard'

// 获取OH卡游戏引用
const ohCardGameRef = ref(null)

// 使用OH卡游戏逻辑
const {
  showConfirmationModal,
  showImagePreviewModal,
  cardImageSrc,
  cardBackImageSrc,
  hasCompletedQuestions,
  
  // 方法
  hideRedrawConfirmation,
  redrawCard,
  hideImagePreview
} = useOHCard()

// 监控模态框状态变化
watch(() => showImagePreviewModal.value, (value) => {
  // 模态框状态变化
})

// 滚动到OH卡游戏区域
const scrollToOhCardGame = () => {
  // 确保组件已加载
  setTimeout(() => {
    if (ohCardGameRef.value) {
      const container = ohCardGameRef.value.ohCardMiniContainer
      if (container) {
        container.scrollIntoView({ behavior: 'smooth' })
        
        // 添加高亮效果
        container.classList.add('highlight')
        setTimeout(() => {
          container.classList.remove('highlight')
        }, 1000)
      }
    }
  }, 100)
}

// 在mounted时检查初始状态
onMounted(() => {
  // 监听滚动，添加动画
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

<style>
/* 全局CSS变量 */
:root {
  --primary-color: #3498DB;
  --accent-color: #2980B9;
  --yellow: #F39C12;
  --accent-yellow: #E67E22;
  --green: #2ECC71;
  --red: #E74C3C;
  --bg-light: #F5F7FA;
  --text-dark: #333;
}

/* 全局动画 */
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

.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.8s ease-out forwards;
  animation-play-state: paused;
}

.fade-in.visible {
  animation-play-state: running;
}

/* 容器样式 */
.content-container {
  padding: 40px 0;
  max-width: 1200px;
  margin: 0 auto;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .content-container {
    padding: 20px 1.5rem;
  }
}
</style> 