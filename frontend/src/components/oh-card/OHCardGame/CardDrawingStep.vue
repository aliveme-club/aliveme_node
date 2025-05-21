<template>
  <div class="oh-card-step">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">你的OH卡</h2>
    
    <div class="card-and-questions-container">
      <!-- 左侧：卡片和重抽按钮 -->
      <div class="card-column">
        <div class="cards-preview-container">
          <div class="card-container" @click="onCardClick">
            <div 
              :class="['card-inner', {'flipped': isCardFlipped, 'card-drawn': hasDrawnCard}]" 
              @click="onCardClick"
            >
              <card-front 
                :src="cardImageSrc" 
                @error="onCardImageError"
                @click="onCardClick"
                ref="cardFrontRef"
              />
              <card-back 
                :src="cardBackImageSrc"
                :has-completed-questions="hasCompletedQuestions"
                @error="onCardBackImageError"
                @click="onCardClick"
                ref="cardBackRef"
              />
            </div>
          </div>
        </div>
        
        <div v-if="!hasAnsweredQuestion" class="redraw-container mt-4">
          <button class="redraw-button" @click="onRedraw">
            <i class="fas fa-sync-alt mr-1"></i> 我要重抽
          </button>
        </div>
      </div>
      
      <!-- 右侧：问题选项或完成界面 -->
      <div v-if="!hasCompletedQuestions" class="questions-column">
        <h3 class="text-xl font-bold mb-4 text-gray-800">看到这张卡牌的画面，你可以：</h3>
        <div class="questions-grid">
          <question-option 
            v-for="(question, index) in questions" 
            :key="index" 
            :question="question"
            :is-selected="selectedIndices.includes(index)"
            @select="() => onSelectQuestion(question, index)"
          />
        </div>
      </div>
      
      <!-- 右侧：完成界面 -->
      <div v-if="hasCompletedQuestions" class="final-column">
        <final-step 
          @save="onSave"
          @restart="onRestart"
          @flip="onFlipCard"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CardFront from './CardFront.vue'
import CardBack from './CardBack.vue'
import QuestionOption from './QuestionOption.vue'
import FinalStep from './FinalStep.vue'

const props = defineProps({
  cardImageSrc: {
    type: String,
    required: true
  },
  cardBackImageSrc: {
    type: String,
    required: true
  },
  questions: {
    type: Array,
    required: true
  },
  isCardFlipped: {
    type: Boolean,
    default: false
  },
  hasDrawnCard: {
    type: Boolean,
    default: false
  },
  hasAnsweredQuestion: {
    type: Boolean,
    default: false
  },
  hasCompletedQuestions: {
    type: Boolean,
    default: false
  },
  selectedIndices: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits([
  'card-click',
  'redraw',
  'select-question',
  'card-image-error',
  'card-back-image-error',
  'card-back-preview-error',
  'save',
  'restart',
  'flip-card'
])

const cardBackPreviewError = ref(false)
const cardFrontRef = ref(null)
const cardBackRef = ref(null)

const onCardClick = () => {
  console.log('[OH卡] 点击卡片，触发预览')
  console.log('[OH卡] 卡片元素:', {
    cardContainer: document.querySelector('.card-container') ? '存在' : '不存在',
    cardFrontRef: cardFrontRef.value ? '存在' : '不存在',
    cardBackRef: cardBackRef.value ? '存在' : '不存在'
  })
  emit('card-click')
  
  // 检查事件后的模态框状态
  setTimeout(() => {
    const modalElement = document.querySelector('.image-preview-modal')
    console.log('[OH卡] 点击后模态框状态:', modalElement ? '存在' : '不存在')
    
    if (modalElement) {
      console.log('[OH卡] 模态框样式:', {
        display: window.getComputedStyle(modalElement).display,
        visibility: window.getComputedStyle(modalElement).visibility,
        opacity: window.getComputedStyle(modalElement).opacity,
        zIndex: window.getComputedStyle(modalElement).zIndex
      })
    }
  }, 500)
}

const onRedraw = () => {
  emit('redraw')
}

const onSelectQuestion = (question, index) => {
  emit('select-question', question, index)
}

const onCardImageError = (e) => {
  emit('card-image-error', e)
}

const onCardBackImageError = (e) => {
  emit('card-back-image-error', e)
}

const onCardBackPreviewError = (e) => {
  cardBackPreviewError.value = true
  emit('card-back-preview-error', e)
}

const onSave = () => {
  emit('save')
}

const onRestart = () => {
  emit('restart')
}

const onFlipCard = () => {
  emit('flip-card')
}

defineExpose({
  cardFrontRef,
  cardBackRef
})
</script>

<style scoped>
.oh-card-step {
  display: block;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

/* 布局结构 */
.card-and-questions-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 30px;
  margin-bottom: 2rem;
}

.card-column {
  flex: none;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.questions-column {
  flex: 1;
  min-width: 0;
}

.final-column {
  flex: 1;
  min-width: 0;
  max-width: 380px; /* 控制完成界面的最大宽度 */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
}

.questions-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 卡片样式 */
.cards-preview-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.card-container {
  perspective: 1000px;
  width: 200px;
  height: 300px; /* 保持与最终导出图片相同的3:2宽高比 */
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  position: relative;
  cursor: pointer;
}

/* 添加点击提示 */
.card-container::after {
  content: '点击查看大图';
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  text-align: center;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 3px 0;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-container:hover::after {
  opacity: 1;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
  cursor: pointer;
  will-change: transform;
}

/* 添加卡片悬停效果 */
.card-inner:hover {
  box-shadow: 0 0 15px var(--yellow, #F39C12);
  transform: scale(1.02);
}

.card-inner.flipped {
  transform: rotateY(180deg);
}

.card-inner.flipped:hover {
  box-shadow: 0 0 15px var(--yellow, #F39C12);
  transform: rotateY(180deg) scale(1.02);
}

.card-inner.card-drawn {
  animation: drawCard 0.8s ease-out;
}

@keyframes drawCard {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 美化重抽按钮 */
.redraw-container {
  width: 100%;
  text-align: center;
  margin-top: 1.5rem;
}

.redraw-button {
  background: var(--yellow, #F39C12);
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(243, 156, 18, 0.3);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.redraw-button:hover {
  background: var(--accent-yellow, #E67E22);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(243, 156, 18, 0.4);
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

/* 响应式调整 */
@media (max-width: 768px) {
  .card-and-questions-container {
    flex-direction: column;
    align-items: center;
  }
  
  .card-column, .questions-column, .final-column {
    width: 100%;
    max-width: 100%;
  }
  
  .questions-column, .final-column {
    margin-top: 2rem;
  }
}
</style> 