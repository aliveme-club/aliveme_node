<template>
  <div class="oh-card-step active">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">{{ $t('components.ohCard.IntroStep.title') }}</h2>
    <p class="mb-6 text-gray-700">{{ $t('components.ohCard.IntroStep.description') }}</p>
    <button class="btn-primary" @click="onReady">{{ $t('components.ohCard.IntroStep.startButton') }}</button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const emit = defineEmits(['ready'])

const onReady = () => {
  emit('ready')
}
</script>

<style scoped>
.oh-card-step {
  display: block;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.5s ease, transform 0.5s ease;
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