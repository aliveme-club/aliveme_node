<template>
  <section class="section bg-light">
    <div class="container mx-auto px-4">
      <div class="title-container">
        <div class="yellow-line"></div>
        <h2 class="section-title text-3xl">OH卡流程</h2>
      </div>

      <div class="process-container">
        <div 
          v-for="(step, index) in steps" 
          :key="index" 
          class="card fade-in interactive-card" 
          :style="{'animation-delay': `${0.1 * (index + 1)}s`}"
          @click="highlightCard"
        >
          <h3 class="text-xl font-bold mb-3 text-center">{{ step.title }}</h3>
          <p class="text-center">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// 定义OH卡流程步骤
const steps = [
  {
    title: '确定心中的卡点',
    description: '思考你最近遇到的困惑或问题'
  },
  {
    title: '凝聚宇宙能量',
    description: '抽取你的OH卡'
  },
  {
    title: '问题引导',
    description: '让自己代入图片中'
  },
  {
    title: '寻找启发',
    description: '从图片与问题中找到解决卡点的启发'
  },
  {
    title: '完成体验',
    description: '拿走你的纪念卡'
  }
]

// 点击卡片时添加高亮动画
const highlightCard = (event) => {
  const card = event.currentTarget;
  card.classList.add('card-highlight');
  
  // 动画结束后移除高亮类
  setTimeout(() => {
    card.classList.remove('card-highlight');
  }, 800);
}
</script>

<style scoped>
.section {
  padding: 3rem 0;
}

.bg-light {
  background-color: var(--bg-light, #F5F7FA);
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

.process-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  flex: 1;
  min-width: 160px;
  padding: 1.25rem 1rem;
  cursor: pointer;
}

.interactive-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(243, 156, 18, 0.2);
  border: 1px solid rgba(243, 156, 18, 0.3);
}

.card-highlight {
  animation: highlight 0.8s ease;
}

@keyframes highlight {
  0% {
    background-color: white;
    transform: scale(1);
  }
  50% {
    background-color: rgba(243, 156, 18, 0.15);
    transform: scale(1.05);
    box-shadow: 0 10px 25px rgba(243, 156, 18, 0.4);
  }
  100% {
    background-color: white;
    transform: scale(1);
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

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .section {
    padding: 2rem 0;
  }
  
  .section-title {
    font-size: 1.75rem;
  }
  
  .process-container {
    flex-direction: column;
  }
}
</style> 