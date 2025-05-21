<template>
  <div class="card-front" @click="onClick">
    <img 
      v-if="!hasError"
      :src="src" 
      alt="OH卡" 
      class="card-img-preview"
      @error="onError"
      ref="cardImgElement"
    >
    <div v-else class="fallback-content">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
      <div class="fallback-message">卡片图像加载失败</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['error', 'click'])
const hasError = ref(false)
const cardImgElement = ref(null)

const onError = (e) => {
  console.error('[OH卡] CardFront组件: 图片加载失败', props.src)
  hasError.value = true
  emit('error', e)
}

const onClick = () => {
  console.log('[OH卡] 点击卡片正面')
  emit('click')
}

// 当src变化时，重置错误状态
watch(() => props.src, (newSrc) => {
  if (newSrc && newSrc.startsWith('data:image/svg+xml')) {
    // 如果是内联SVG (备用图像)，不需要重置错误状态
    return
  }
  
  // 重置错误状态，给新图片一次机会
  hasError.value = false
})

defineExpose({
  cardImgElement
})
</script>

<style scoped>
.card-front {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-color, #3498DB);
}

.card-img-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.fallback-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: white;
  padding: 1rem;
  text-align: center;
}

.fallback-message {
  margin-top: 0.5rem;
  font-size: 0.875rem;
}
</style> 