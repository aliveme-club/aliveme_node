<template>
  <section id="timeline" class="section bg-light timeline-section">
    <div class="container mx-auto px-4">
      <h2 class="section-title text-3xl text-center mb-16">{{ $t('components.home.TimelineSection.title') }}</h2>
      <div class="timeline">
        <div v-for="(item, index) in timelineItems" :key="index" 
             class="timeline-item fade-in" 
             :style="{ animationDelay: `${index * 0.2}s` }">
          <div class="timeline-content">
            <h3 class="font-bold text-xl mb-2">{{ item.date }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { computed } from 'vue'

const { t,tm } = useI18n();

const timelineItems = computed(() => tm('components.home.TimelineSection.timelineItems')) ;
</script>

<style scoped>
.timeline-section {
  padding: 40px 0;
  background-color: var(--background-color, #f9fafb);
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

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  height: 100%;
  width: 4px;
  background: var(--primary-color, #4A90E2);
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4px;
}

.timeline-item {
  position: relative;
  margin-bottom: 10px;
  width: 100%;
}

.timeline-item:nth-child(odd) .timeline-content {
  margin-left: auto;
  margin-right: 40px;
  padding-right: 40px;
  text-align: right;
}

.timeline-item:nth-child(even) .timeline-content {
  margin-right: auto;
  margin-left: 40px;
  padding-left: 40px;
  text-align: left;
}

.timeline-item::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background: var(--accent-color, #F5A623);
  border: 4px solid var(--primary-color, #4A90E2);
  border-radius: 50%;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.timeline-content {
  position: relative;
  width: calc(50% );
  background: var(--card-background, #fff);
  padding:5px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.timeline-content h3 {
  color: var(--primary-color, #4A90E2);
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.timeline-content p {
  color: var(--text-secondary, #606266);
  line-height: 1.6;
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
@media (max-width: 768px) {
  .timeline::before {
    left: 30px;
  }
  
  .timeline-item::after {
    left: 30px;
    transform: none;
  }
  
  .timeline-item .timeline-content {
    width: calc(100% - 80px);
    margin-left: 80px !important;
    margin-right: 0 !important;
    padding-left: 20px !important;
    padding-right: 20px !important;
    text-align: left !important;
  }
}
</style> 