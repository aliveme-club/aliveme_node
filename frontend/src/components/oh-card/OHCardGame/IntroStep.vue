<template>
  <div class="oh-card-step active">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">开始你的OH卡之旅</h2>
    <p class="mb-6 text-gray-700">请在心里回想最近一段时间内心的困惑、卡点或者其他问题，准备好开始体验。</p>
    <button class="btn-primary" @click="onReady">我准备好了</button>
  </div>
</template>

<script setup>
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