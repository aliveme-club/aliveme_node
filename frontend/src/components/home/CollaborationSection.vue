<template>
  <section class="collaboration-section">
    <div class="container mx-auto px-4">
      <h2 class="section-title text-3xl text-center centered mb-16">{{ $t('components.home.CollaborationSection.title') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div v-for="(project, index) in collaborationProjects" :key="index"
             class="collaboration-card fade-in" 
             :style="{ animationDelay: `${index * 0.1}s` }">
          <div class="collaboration-icon">
            <el-icon :size="40"><component :is="project.icon" /></el-icon>
          </div>
          <h3 class="text-xl font-bold mb-4">{{ $t(`components.home.CollaborationSection.collaborationProjects[${index}].title`) }}</h3>
          <p class="mb-4">{{ $t(`components.home.CollaborationSection.collaborationProjects[${index}].subtitle`) }}</p>
          <p>{{ $t(`components.home.CollaborationSection.collaborationProjects[${index}].description`) }}</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="(method, index) in collaborationMethods" :key="index"
             class="collaboration-card fade-in" 
             :style="{ animationDelay: `${(index + 2) * 0.1}s` }">
          <div class="collaboration-icon">
            <el-icon :size="40"><component :is="method.icon" /></el-icon>
          </div>
          <h3 class="text-xl font-bold mb-4">{{ $t(`components.home.CollaborationSection.collaborationMethods[${index}].title`) }}</h3>
          <p class="mb-4" v-for="(item, itemIndex) in method.items" :key="itemIndex">
            {{ $t(`components.home.CollaborationSection.collaborationMethods[${index}].items[${itemIndex}]`) }}
          </p>
          <el-button v-if="method.hasButton" type="warning" class="btn-yellow">{{ $t('components.home.CollaborationSection.contactButton') }}</el-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { OfficeBuilding, Promotion, TakeawayBox, Calendar } from '@element-plus/icons-vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const collaborationProjects = [
  {
    title: '中医诊所合作',
    subtitle: '上海杏元中医诊所（ALiveMe协办5.1-5.4台湾名医来沪讲座）',
    description: '我们与上海杏元中医诊所合作，共同推出一系列结合中医与心理健康的讲座和活动，帮助用户全面提升身心健康。',
    icon: 'OfficeBuilding'
  },
  {
    title: '心理咨询工作室合作',
    subtitle: 'ALiveMe预计协办上海家庭教育讲座与咨询家访等系列活动',
    description: '与专业心理咨询工作室合作，提供高质量的心理咨询服务和家庭教育指导，帮助用户解决心理问题和家庭关系困扰。',
    icon: 'Promotion'
  }
];

const collaborationMethods = [
  {
    title: '游戏疗愈与戏剧疗愈',
    items: ['《交换人生》剧本桌游与其他疗愈游戏合作'],
    description: '与游戏疗愈和戏剧疗愈专家合作，开发创新的体验式活动，如《交换人生》剧本桌游，通过游戏化方式促进自我探索和人际连接。',
    icon: 'TakeawayBox',
    hasButton: false
  },
  {
    title: '合作方式',
    items: [
      '1. 通过ALiveMe小程序协助社群管理和活动发布',
      '2. 帮助B2B资源链接，促成合作'
    ],
    icon: 'Calendar',
    hasButton: true
  }
];
</script>

<style scoped>
.collaboration-section {
  padding: 80px 0;
  background-color: var(--card-background, #fff);
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(74, 144, 226, 0.05) 0%, transparent 100%), 
    radial-gradient(circle at 80% 20%, rgba(245, 166, 35, 0.05) 0%, transparent 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  color: var(--text-primary, #333);
  font-size: 1.875rem;
  text-align: center;
  margin-bottom: 4rem;
}

.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.gap-8 {
  gap: 2rem;
}

.mb-12 {
  margin-bottom: 3rem;
}

.collaboration-card {
  background: var(--card-background, #fff);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border-top: 4px solid var(--primary-color, #4A90E2);
}

.collaboration-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.collaboration-icon {
  margin-bottom: 1.5rem;
  color: var(--primary-color, #4A90E2);
  display: flex;
  align-items: center;
}

.text-xl {
  font-size: 1.25rem;
}

.font-bold {
  font-weight: 700;
}

.mb-4 {
  margin-bottom: 1rem;
}

.btn-yellow {
  background-color: var(--accent-color, #F5A623);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  margin-top: 1rem;
  display: inline-block;
  transition: all 0.3s ease;
}

.btn-yellow:hover {
  background-color: #e59819;
  transform: translateY(-2px);
}

.fade-in {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
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

/* 响应式布局 */
@media (min-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style> 