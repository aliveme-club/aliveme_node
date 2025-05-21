<template>
  <div class="oh-card-step">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">{{ $t('components.ohCard.OHCardGame.EnergyGatheringStep.title') }}</h2>
    <div class="energy-animation mb-8">
      <div class="energy-circle"></div>
    </div>
    <p class="mb-8 text-gray-700">{{ $t('components.ohCard.OHCardGame.EnergyGatheringStep.description') }}</p>
    <button class="btn-primary" @click="onDraw">{{ $t('components.ohCard.OHCardGame.EnergyGatheringStep.drawButton') }}</button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const emit = defineEmits(['draw'])

const onDraw = () => {
  emit('draw')
}
</script>

<style scoped>
.oh-card-step {
  display: block;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

/* 能量动画 */
.energy-animation {
  position: relative;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.energy-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--yellow, #F39C12) 0%, var(--green, #2ECC71) 100%);
  box-shadow: 0 0 40px var(--yellow, #F39C12);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    box-shadow: 0 0 0 0 rgba(243, 156, 18, 0.7);
  }
  70% {
    transform: scale(1.1);
    box-shadow: 0 0 0 25px rgba(243, 156, 18, 0);
  }
  100% {
    transform: scale(0.8);
    box-shadow: 0 0 0 0 rgba(243, 156, 18, 0);
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
</style> 