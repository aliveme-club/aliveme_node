<template>
  <section class="hero-section text-white">
    <div class="container mx-auto px-4">
      <div class="hero-content">
        <div class="hero-left fade-in">
          <h1 class="text-4xl md:text-6xl font-bold mb-4">{{ $t('components.ohCard.ohCardHero.title') }}</h1>
          <p class="text-xl md:text-2xl mb-6">{{ $t('components.ohCard.ohCardHero.subtitle') }}</p>
          <p class="text-lg mb-8">{{ $t('components.ohCard.ohCardHero.description') }}</p>
        </div>
        <div class="hero-right fade-in" style="animation-delay: 0.3s">
          <slot></slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const emit = defineEmits(['start-experience'])

const onStartExperience = () => {
  emit('start-experience')
}
</script>

<style scoped>
.hero-section {
  background: linear-gradient(to right, #56C271, #4A90E2);
  padding: 0;
  height: 550px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.container {
  height: 100%;
  display: flex;
  align-items: center;
  width: 100%;
}

.hero-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hero-left {
  width: 45%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-right {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
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

.btn-primary {
  background: var(--yellow, #F39C12);
  color: white;
  padding: 0.75rem 1.75rem;
  border-radius: 8px;
  font-weight: 700;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  background: var(--accent-yellow, #E67E22);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(243, 156, 18, 0.3);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .hero-section {
    height: auto;
    min-height: 550px;
    padding: 4rem 0;
  }
  
  .hero-content {
    flex-direction: column;
  }
  
  .hero-left {
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
    padding-right: 0;
  }
  
  .hero-right {
    width: 100%;
  }
}
</style> 