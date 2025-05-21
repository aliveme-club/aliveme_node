<template>
  <div class="final-step">
    <h3 class="text-xl font-bold mb-4 text-gray-800">恭喜完成了OH卡体验！</h3>
    <div class="final-content">
      <p class="mb-4 text-gray-700">你可以点击卡片放大查看，或保存卡片作为纪念。</p>
      <div class="action-buttons mb-5">
        <button class="btn-primary" @click="onSave">
          <i class="fas fa-download mr-1"></i> 保存卡片
        </button>
        <button class="btn-secondary" @click="onFlip">
          <i class="fas fa-sync-alt mr-1"></i> 卡片翻面
        </button>
        <button class="btn-yellow" @click="onRestart">
          <i class="fas fa-redo mr-1"></i> 再次体验
        </button>
      </div>
      <div class="tip-container">
        <p class="text-sm text-gray-600">
          <i class="fas fa-info-circle mr-1"></i>
          点击卡片可以放大查看
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['save', 'restart', 'flip'])

const onSave = () => {
  emit('save')
}

const onRestart = () => {
  emit('restart')
}

const onFlip = () => {
  emit('flip')
}
</script>

<style scoped>
.final-step {
  display: block;
  animation: fadeIn 0.6s ease-in-out;
  height: 100%;
}

.final-content {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  max-width: 380px;
  margin: 0 auto;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-primary {
  background: var(--yellow, #F39C12);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.btn-primary:hover {
  background: var(--accent-yellow, #E67E22);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(243, 156, 18, 0.3);
}

.btn-secondary {
  background: var(--primary-color, #3498DB);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.btn-secondary:hover {
  background: var(--accent-color, #2980B9);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

.btn-yellow {
  background: transparent;
  color: var(--yellow, #F39C12);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid var(--yellow, #F39C12);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.btn-yellow:hover {
  background: rgba(243, 156, 18, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(243, 156, 18, 0.1);
}

.tip-container {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed #e2e2e2;
  text-align: center;
}

/* 响应式样式 */
@media (min-width: 640px) {
  .action-buttons {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 12px;
  }
  
  .btn-primary, .btn-secondary, .btn-yellow {
    width: 31%;
    padding: 0.75rem 0.5rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 639px) {
  .final-content {
    max-width: 100%;
  }
}
</style> 