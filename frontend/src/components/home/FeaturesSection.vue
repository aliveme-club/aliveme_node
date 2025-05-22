<template>
  <section id="features" class="section features-section">
    <div class="container mx-auto px-4">
      <h2 class="section-title text-3xl text-center mb-16">{{ $t('components.home.FeaturesSection.title') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(feature, index) in features" :key="index"
             class="card p-6 fade-in interactive-card" 
             :style="{ animationDelay: `${index * 0.1}s` }">
          <div class="feature-icon">
            <el-icon :size="40"><component :is="feature.icon" /></el-icon>
          </div>
          <h3 class="text-xl font-bold mb-4">{{ $t(`components.home.FeaturesSection.features[${index}].title`) }}</h3>
          <p>{{ $t(`components.home.FeaturesSection.features[${index}].description`) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Opportunity, Connection, Notification, Key, DataAnalysis, List } from '@element-plus/icons-vue';
import { useI18n } from 'vue-i18n';
import{computed} from 'vue';

const { tm } = useI18n();

const features = computed(() => tm('components.home.FeaturesSection.features'));

</script>

<style scoped>
.features-section {
  padding: 40px 0;
  background-color: var(--card-background, #fff);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  color: var(--text-primary, #333);
  font-size: 1.875rem;
  text-align: center;
  margin-bottom: 1rem;
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

.card {
  background: var(--card-background, #fff);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.interactive-card {
  cursor: pointer;
}

.interactive-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  margin-bottom: 1.5rem;
  color: var(--primary-color, #4A90E2);
  display: flex;
  justify-content: center;
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
  .md\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .card {
    margin-bottom: 1.5rem;
  }
}
</style> 