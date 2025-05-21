<template>
  <!-- Features Section -->
  <section class="section bg-light">
    <div class="container mx-auto px-4">
      <h2 class="section-title text-3xl text-center mb-16">{{ $t('components.lifeExchange.featuresSection.title') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="card p-6 fade-in" style="animation-delay: 0.1s">
          <div class="feature-icon">
            <el-icon><UserFilled /></el-icon>
          </div>
          <h3 class="text-xl font-bold mb-4">{{ $t('components.lifeExchange.featuresSection.roleplayTitle') }}</h3>
          <p>{{ $t('components.lifeExchange.featuresSection.roleplayDescription') }}</p>
        </div>
        <div class="card p-6 fade-in" style="animation-delay: 0.2s">
          <div class="feature-icon">
            <el-icon><ChatDotRound /></el-icon>
          </div>
          <h3 class="text-xl font-bold mb-4">{{ $t('components.lifeExchange.featuresSection.dialogueTitle') }}</h3>
          <p>{{ $t('components.lifeExchange.featuresSection.dialogueDescription') }}</p>
        </div>
        <div class="card p-6 fade-in" style="animation-delay: 0.3s">
          <div class="feature-icon">
            <el-icon><Sunny /></el-icon>
          </div>
          <h3 class="text-xl font-bold mb-4">{{ $t('components.lifeExchange.featuresSection.insightsTitle') }}</h3>
          <p>{{ $t('components.lifeExchange.featuresSection.insightsDescription') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { UserFilled, ChatDotRound, Sunny } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
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
  .section {
    padding: 40px 0;
  }
}
</style> 