<template>
  <div class="oh-card-mini-container bg-white rounded-lg shadow-lg p-6" ref="ohCardMiniContainer">
    <!-- 步骤1: 介绍 -->
    <intro-step 
      v-if="currentStep === 1"
      @ready="goToStep(2)"
    />

    <!-- 步骤2: 能量收集 -->
    <energy-gathering-step 
      v-if="currentStep === 2"
      @draw="drawCard"
    />

    <!-- 步骤3: 抽卡和问题 -->
    <card-drawing-step 
      v-if="currentStep === 3"
      :card-image-src="cardImageSrc"
      :card-back-image-src="cardBackImageSrc"
      :questions="currentQuestions"
      :is-card-flipped="isCardFlipped"
      :has-drawn-card="hasDrawnCard"
      :has-answered-question="hasAnsweredQuestion"
      :has-completed-questions="hasCompletedQuestions"
      :selected-indices="selectedQuestionIndices"
      @card-click="showImagePreview"
      @redraw="showRedrawConfirmation"
      @select-question="selectQuestionOption"
      @card-image-error="handleCardImageError"
      @card-back-image-error="handleCardBackImageError"
      @card-back-preview-error="handleCardBackPreviewError"
      @save="saveCard"
      @restart="restartGame"
      @flip-card="toggleCardFlip"
      ref="cardDrawingStepRef"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useOHCard from '@/composables/useOHCard'
import IntroStep from './IntroStep.vue'
import EnergyGatheringStep from './EnergyGatheringStep.vue'
import CardDrawingStep from './CardDrawingStep.vue'

// 使用OH卡游戏逻辑
const {
  currentStep,
  currentRound,
  selectedQuestions,
  selectedQuestionIndices,
  currentCardNumber,
  hasAnsweredQuestion,
  hasDrawnCard,
  isCardFlipped,
  hasCompletedQuestions,
  ohCardMiniContainer,
  cardImageSrc,
  cardBackImageSrc,
  cardImageError,
  cardBackImageError,
  cardBackPreviewError,
  cardImgElement,
  cardBackImgElement,
  currentQuestions,
  
  // 方法
  goToStep,
  drawCard,
  selectQuestionOption,
  showRedrawConfirmation,
  showImagePreview,
  toggleCardFlip,
  saveCard,
  restartGame,
  handleCardImageError,
  handleCardBackImageError,
  handleCardBackPreviewError
} = useOHCard()

const cardDrawingStepRef = ref(null)

// 暴露容器引用给父组件
defineExpose({
  ohCardMiniContainer
})
</script>

<style scoped>
/* OH卡游戏组件样式 */
.oh-card-mini-container {
  min-height: 480px;
  max-width: 100%;
  transition: all 0.4s ease;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.oh-card-mini-container.highlight {
  box-shadow: 0 0 25px var(--yellow, #F39C12);
  transform: scale(1.02);
}
</style> 