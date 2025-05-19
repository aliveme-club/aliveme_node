<template>
  <div class="women-unlimited-page">
    <!-- Hero Section -->
    <section class="hero-section text-white">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-10 md:mb-0 fade-in">
            <h1 class="text-4xl md:text-6xl font-bold mb-4">无界女性</h1>
            <p class="text-xl md:text-2xl mb-6">突破界限，绽放自我</p>
            <p class="text-lg mb-8">为女性提供成长、交流和支持的平台，助力每一位女性实现自我价值。</p>
            <button class="btn-primary">加入我们</button>
          </div>
          <div class="md:w-1/2 fade-in" style="animation-delay: 0.3s">
            <div class="women-unlimited-mini-container bg-white rounded-lg shadow-lg p-6">
              <h2 class="text-2xl font-bold mb-6 text-gray-800">我们的使命</h2>
              <p class="mb-6 text-gray-700">打破传统束缚，创造无限可能。在这里，每个女性都能找到属于自己的声音和力量。</p>
              <div class="grid grid-cols-2 gap-4">
                <div class="stat-card p-4 bg-gray-50 rounded-lg">
                  <h3 class="text-2xl font-bold text-primary">1000+</h3>
                  <p class="text-sm text-gray-600">活跃会员</p>
                </div>
                <div class="stat-card p-4 bg-gray-50 rounded-lg">
                  <h3 class="text-2xl font-bold text-primary">50+</h3>
                  <p class="text-sm text-gray-600">主题活动</p>
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
        <h2 class="section-title text-3xl text-center mb-16">核心特色</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card p-6 fade-in" style="animation-delay: 0.1s">
            <div class="feature-icon">
              <el-icon><Connection /></el-icon>
            </div>
            <h3 class="text-xl font-bold mb-4">社区连接</h3>
            <p>与志同道合的女性建立联系，分享经验，互相支持。</p>
          </div>
          <div class="card p-6 fade-in" style="animation-delay: 0.2s">
            <div class="feature-icon">
              <el-icon><Reading /></el-icon>
            </div>
            <h3 class="text-xl font-bold mb-4">成长课程</h3>
            <p>提供专业的成长课程，助力个人发展和职业提升。</p>
          </div>
          <div class="card p-6 fade-in" style="animation-delay: 0.3s">
            <div class="feature-icon">
              <el-icon><Star /></el-icon>
            </div>
            <h3 class="text-xl font-bold mb-4">榜样力量</h3>
            <p>邀请成功女性分享经验，激发更多可能性。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Activities Section -->
    <section class="section">
      <div class="container mx-auto px-4">
        <h2 class="section-title text-3xl text-center mb-16">精彩活动</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="activity-card p-6 fade-in" style="animation-delay: 0.1s">
            <div class="activity-icon">
              <el-icon><Calendar /></el-icon>
            </div>
            <h3 class="text-xl font-bold mb-4">月度沙龙</h3>
            <p class="mb-4">定期举办主题沙龙，探讨女性成长话题，分享经验心得。</p>
            <button class="btn-secondary">了解详情</button>
          </div>
          <div class="activity-card p-6 fade-in" style="animation-delay: 0.2s">
            <div class="activity-icon">
              <el-icon><Trophy /></el-icon>
            </div>
            <h3 class="text-xl font-bold mb-4">成长工作坊</h3>
            <p class="mb-4">专业导师指导，帮助女性突破自我，实现职业发展。</p>
            <button class="btn-secondary">了解详情</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Join Us Section -->
    <section class="section bg-light">
      <div class="container mx-auto px-4 text-center">
        <h2 class="section-title text-3xl mb-8">加入无界女性</h2>
        <p class="text-lg mb-8 max-w-2xl mx-auto">成为我们的一员，与优秀的女性一起成长，创造无限可能。</p>
        <button class="btn-primary">立即加入</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Connection, Reading, Star, Calendar, Trophy } from '@element-plus/icons-vue'
</script>

<style scoped>
.women-unlimited-page {
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

.btn-secondary {
  background: white;
  color: var(--primary-color);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  border: 2px solid var(--primary-color);
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

.activity-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.activity-card:hover {
  transform: translateY(-5px);
}

.activity-icon {
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  font-size: 2rem;
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