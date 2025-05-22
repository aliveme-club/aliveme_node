<template>
  <section class="energy-section">
    <div class="container mx-auto px-4">
      <h2 class="section-title text-3xl text-center centered mb-16">{{ $t('components.home.EnergyCommunitySection.title') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(energy, index) in energyTypes" :key="index"
             class="energy-card fade-in" 
             :class="energy.colorClass"
             :style="{ animationDelay: `${index * 0.1}s` }">
          <div class="energy-icon">
            <el-icon :size="40"><component :is="energy.icon" /></el-icon>
          </div>
          <h3 class="text-xl font-bold mb-4">{{ $t(`components.home.EnergyCommunitySection.energyTypes[${index}].title`) }}</h3>
          <p class="mb-4">{{ $t(`components.home.EnergyCommunitySection.energyTypes[${index}].shortDesc`) }}</p>
          <p>{{ $t(`components.home.EnergyCommunitySection.energyTypes[${index}].longDesc`) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Opportunity, Connection, Lightning } from '@element-plus/icons-vue';
import { useI18n } from 'vue-i18n';
import{computed} from 'vue';

const { tm } = useI18n();

const energyTypes = computed(() => tm('components.home.EnergyCommunitySection.energyTypes'));
</script>

<style scoped>
.energy-section {
  padding: 80px 0;
  background-color: var(--card-background, #fff);
  background-image: linear-gradient(to bottom, rgba(245, 245, 245, 0.8), rgba(245, 245, 245, 0.2)), 
                    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="%23f0f0f0" stroke-width="1"/></svg>');
  background-size: cover, 100px 100px;
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

.energy-card {
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  color: var(--text-light, #fff);
}

.green {
  background: linear-gradient(135deg, var(--green-color), #43a047);
}

.yellow {
  background: linear-gradient(135deg, var(--accent-color), #f57c00);
}

.blue {
  background: linear-gradient(135deg, var(--primary-color), #1976d2);
}

.energy-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.energy-icon {
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
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
</style> 