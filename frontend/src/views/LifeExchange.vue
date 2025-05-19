<template>
  <div class="life-exchange-page">
    <!-- Hero Section -->
    <section class="hero-section text-white">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-10 md:mb-0 fade-in">
            <h1 class="text-4xl md:text-6xl font-bold mb-4">交换人生</h1>
            <p class="text-xl md:text-2xl mb-6">体验不同的人生视角</p>
            <p class="text-lg mb-8">通过AI技术，让你体验不同的人生角色，获得新的视角和启发。</p>
            <button class="btn-primary">开始体验</button>
          </div>
          <div class="md:w-1/2 fade-in" style="animation-delay: 0.3s">
            <div class="life-exchange-mini-container bg-white rounded-lg shadow-lg p-6">
              <h2 class="text-2xl font-bold mb-6 text-gray-800">选择你想体验的人生</h2>
              <div class="grid grid-cols-2 gap-4">
                <div class="role-card p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <h3 class="font-bold mb-2">企业家</h3>
                  <p class="text-sm text-gray-600">体验创业的挑战与机遇</p>
                </div>
                <div class="role-card p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <h3 class="font-bold mb-2">艺术家</h3>
                  <p class="text-sm text-gray-600">感受艺术创作的魅力</p>
                </div>
                <div class="role-card p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <h3 class="font-bold mb-2">科学家</h3>
                  <p class="text-sm text-gray-600">探索科学研究的奥秘</p>
                </div>
                <div class="role-card p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <h3 class="font-bold mb-2">更多角色</h3>
                  <p class="text-sm text-gray-600">探索更多可能性</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="section bg-light">
      <div class="container mx-auto px-4">
        <h2 class="section-title text-3xl text-center mb-16">特色功能</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card p-6 fade-in" style="animation-delay: 0.1s">
            <div class="feature-icon">
              <el-icon><UserFilled /></el-icon>
            </div>
            <h3 class="text-xl font-bold mb-4">角色扮演</h3>
            <p>选择不同的职业和身份，体验不同的人生轨迹和挑战。</p>
          </div>
          <div class="card p-6 fade-in" style="animation-delay: 0.2s">
            <div class="feature-icon">
              <el-icon><ChatDotRound /></el-icon>
            </div>
            <h3 class="text-xl font-bold mb-4">情境对话</h3>
            <p>与AI角色进行深度对话，了解不同职业的日常和挑战。</p>
          </div>
          <div class="card p-6 fade-in" style="animation-delay: 0.3s">
            <div class="feature-icon">
              <el-icon><Light /></el-icon>
            </div>
            <h3 class="text-xl font-bold mb-4">人生启示</h3>
            <p>从不同的人生经历中获得启发，找到新的发展方向。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="section">
      <div class="container mx-auto px-4">
        <h2 class="section-title text-3xl text-center mb-16">如何使用</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="step-card p-6 fade-in" v-for="(step, index) in steps" :key="index" :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="step-number">{{ index + 1 }}</div>
            <h3 class="text-xl font-bold mb-4">{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { UserFilled, ChatDotRound, Light } from '@element-plus/icons-vue'

const steps = [
  {
    title: '选择角色',
    description: '从多个职业和身份中选择你想体验的角色'
  },
  {
    title: '设定场景',
    description: '选择特定的情境或挑战进行体验'
  },
  {
    title: '开始对话',
    description: '与AI角色进行深度对话，了解职业特点'
  },
  {
    title: '获得启发',
    description: '从体验中获取新的视角和启发'
  }
]
</script>

<style scoped>
.life-exchange-page {
  min-height: 100vh;
}

.hero-section {
  padding: 100px 0;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section {
  padding: 80px 0;
}

.section-title {
  color: var(--text-primary);
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  font-size: 2rem;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: var(--accent-color);
  transform: translateY(-2px);
}

.step-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  padding-top: 3rem;
}

.step-number {
  position: absolute;
  top: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 3rem;
  height: 3rem;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
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

@media (max-width: 768px) {
  .hero-section {
    padding: 60px 0;
  }

  .section {
    padding: 40px 0;
  }
}
</style> 