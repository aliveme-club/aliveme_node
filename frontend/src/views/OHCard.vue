<template>
  <div class="oh-card-page">
    <!-- Hero Section -->
    <section class="hero-section text-white">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-10 md:mb-0 fade-in">
            <h1 class="text-4xl md:text-6xl font-bold mb-4">OH卡</h1>
            <p class="text-xl md:text-2xl mb-6">探索内心的窗口</p>
            <p class="text-lg mb-8">结合AI生成技术与传统心理学理念，帮助用户探索内心世界。</p>
            <button class="btn-primary">立即体验 OH卡</button>
          </div>
          <div class="md:w-1/2 fade-in" style="animation-delay: 0.3s">
            <div class="oh-card-mini-container bg-white rounded-lg shadow-lg p-6">
              <h2 class="text-2xl font-bold mb-6 text-gray-800">开始你的OH卡之旅</h2>
              <p class="mb-6 text-gray-700">请在心里回想最近一段时间内心的困惑、卡点或者其他问题，准备好开始体验。</p>
              <button class="btn-primary">我想好了</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- OH Card Process Section -->
    <section class="section bg-light">
      <div class="container mx-auto px-4">
        <h2 class="section-title text-3xl text-center mb-16">OH卡流程</h2>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div class="card p-6 fade-in interactive-card" v-for="(step, index) in steps" :key="index" :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="feature-icon flex justify-center">
              <span class="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">{{ index + 1 }}</span>
            </div>
            <h3 class="text-xl font-bold mb-4 text-center">{{ step.title }}</h3>
            <p class="text-center">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- OH Card Introduction Section -->
    <section class="section">
      <div class="container mx-auto px-4">
        <h2 class="section-title text-3xl text-center mb-16">OH卡介绍</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="card p-6 fade-in interactive-card" style="animation-delay: 0.1s">
            <div class="feature-icon">
              <el-icon><Light /></el-icon>
            </div>
            <h3 class="text-xl font-bold mb-4">主要特点</h3>
            <ul class="list-disc pl-6 mb-4">
              <li class="mb-2">AI生成独特图像，激发联想</li>
              <li class="mb-2">个性化引导问题，深入自我探索</li>
              <li class="mb-2">专业心理学支持，确保使用安全</li>
            </ul>
          </div>

          <div class="card p-6 fade-in interactive-card" style="animation-delay: 0.2s">
            <div class="feature-icon">
              <el-icon><User /></el-icon>
            </div>
            <h3 class="text-xl font-bold mb-4">使用场景</h3>
            <ul class="list-disc pl-6 mb-4">
              <li class="mb-2">个人成长探索</li>
              <li class="mb-2">团体互动活动</li>
              <li class="mb-2">心理咨询辅助工具</li>
            </ul>
          </div>
        </div>

        <div class="card p-6 fade-in" style="animation-delay: 0.3s">
          <h3 class="text-xl font-bold mb-4">OH卡是什么？</h3>
          <p class="mb-4">OH卡是一种创新的心理工具，结合AI生成技术与传统心理学理念，帮助用户探索内心世界。通过精心设计的图像和引导问题，OH卡能够激发用户的联想和思考，帮助他们更好地理解自己的情绪、想法和需求。</p>
          <p>无论是个人使用还是团体活动，OH卡都能够创造一个安全、开放的空间，让参与者自由表达，深入探索内心世界，发现自我成长的可能性。</p>
        </div>

        <!-- 活动照片展示 -->
        <div class="mt-16 grid grid-cols-2 gap-4">
          <img :src="ohEventImg1Url" alt="OH卡活动照片" class="rounded-lg shadow h-40 w-full object-cover">
          <img :src="ohLifeExchangeImg1Url" alt="OH卡活动照片" class="rounded-lg shadow h-40 w-full object-cover">
          <img :src="ohLifeExchangeImg2Url" alt="OH卡活动照片" class="rounded-lg shadow h-40 w-full object-cover">
          <img :src="ohAlivemeIntroImgUrl" alt="OH卡活动照片" class="rounded-lg shadow h-40 w-full object-cover">
        </div>

        <!-- 用户路线图 -->
        <div class="mt-16 fade-in">
          <img :src="ohRoadmapImgUrl" alt="OH卡用户路线图" class="w-full max-w-4xl mx-auto transform hover:scale-105 transition-transform duration-300 ease-in-out">
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Light, User } from '@element-plus/icons-vue'

import ohEventImg1Url from '@/assets/images/events/shanghai_new_year_2025.jpg';
import ohLifeExchangeImg1Url from '@/assets/images/life-exchange/life_exchange_beta_group_photo2.jpg';
import ohLifeExchangeImg2Url from '@/assets/images/life-exchange/life_exchange_beta_photo.jpg';
import ohAlivemeIntroImgUrl from '@/assets/images/aliveme/aliveme_intro_beta_venue.jpg';
import ohRoadmapImgUrl from '@/assets/images/aliveme/user_roadmap.svg';

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
</script>

<style scoped>
.oh-card-page {
  min-height: 100vh;
}

.hero-section {
  padding: 100px 0;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem; /* px-4 */
}

.section {
  padding: 80px 0;
}

.section-title {
  color: var(--text-primary);
  font-size: 1.875rem; /* text-3xl */
  text-align: center;
  margin-bottom: 4rem; /* mb-16 */
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
  font-size: 1.5rem; /* Adjusted for icon size */
}

.feature-icon .el-icon {
  font-size: 2em; /* Ensure ElPlus icons are visible */
}

.btn-primary {
  background: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background: var(--accent-color);
  transform: translateY(-2px);
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

/* Copied from AboutSection for consistency, assuming similar usage of Tailwind classes */
.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.md\:grid-cols-2 {
   /* For medium screens and up */
}

.md\:grid-cols-5 {
  /* For medium screens and up */
}

.gap-4 {
  gap: 1rem;
}

.gap-6 {
  gap: 1.5rem;
}

.gap-8 {
  gap: 2rem;
}

.mb-12 {
  margin-bottom: 3rem;
}

.pl-6 {
  padding-left: 1.5rem;
}

.text-gray-800 { color: #2d3748; }
.text-gray-700 { color: #4a5568; }

.oh-card-mini-container {
  /* Add any specific styles from main.html if they existed for such a container */
}

.rounded-lg { border-radius: 0.5rem; }
.shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); }
.h-40 { height: 10rem; }
.w-full { width: 100%; }
.object-cover { object-fit: cover; }
.mt-16 { margin-top: 4rem; }
.max-w-4xl { max-width: 56rem; }
.transform { /* For Tailwind transform utilities */ }
.hover\:scale-105:hover { transform: scale(1.05); }
.transition-transform { transition-property: transform; }
.duration-300 { transition-duration: 300ms; }
.ease-in-out { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }

@media (min-width: 768px) { /* md */
  .md\:flex-row {
    flex-direction: row;
  }
  .md\:w-1\/2 {
    width: 50%;
  }
  .md\:mb-0 {
    margin-bottom: 0;
  }
  .md\:text-6xl {
    font-size: 3.75rem; 
  }
  .md\:text-2xl {
    font-size: 1.5rem;
  }
  .md\:grid-cols-2 {
   grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .md\:grid-cols-5 {
   grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 60px 0;
  }

  .section {
    padding: 40px 0;
  }
  .grid-cols-1,
  .md\:grid-cols-2,
  .md\:grid-cols-5 {
    grid-template-columns: repeat(1, minmax(0, 1fr)); /* Stack on mobile */
  }
}
</style> 