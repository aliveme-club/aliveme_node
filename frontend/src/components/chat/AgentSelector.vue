<template>
  <div class="agent-selector">
    <div class="agent-cards-container">
      <div class="agent-cards">
        <div 
          v-for="agent in agents" 
          :key="agent.type"
          class="agent-card"
          :class="[agent.colorClass, {'disabled': agent.disabled}]"
          @click="!agent.disabled && selectAgent(agent.type)"
        >
          <div class="card-bg"></div>
          <div class="card-content">
            <h3 class="card-title">{{ $t(`components.chat.AgentSelector.${agent.i18nKey}.title`) }}</h3>
            <p class="card-desc">{{ $t(`components.chat.AgentSelector.${agent.i18nKey}.tagline`) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// 定义助手卡片数据
const agents = [
  { 
    type: 'activityAssistant', 
    i18nKey: 'activityCoach',
    colorClass: 'bg-coach',
    disabled: false
  },
  { 
    type: 'travelAssistant', 
    i18nKey: 'mindAssistant',
    colorClass: 'bg-mind',
    disabled: false
  },
  { 
    type: 'foodAssistant', 
    i18nKey: 'healthAssistant',
    colorClass: 'bg-health',
    disabled: false
  },
  { 
    type: 'lifeAssistant', 
    i18nKey: 'relationshipAssistant',
    colorClass: 'bg-relation',
    disabled: true
  }
];

const emit = defineEmits(['select']);

function selectAgent(type) {
  // 添加卡片选择动画
  const cards = document.querySelectorAll('.agent-card:not(.disabled)');
  cards.forEach(card => {
    const cardTitle = card.querySelector('.card-title').textContent;
    const selectedAgent = agents.find(a => a.type === type);
    const selectedTitle = t(`components.chat.AgentSelector.${selectedAgent.i18nKey}.title`);
    
    if (cardTitle.includes(selectedTitle)) {
      card.classList.add('selected');
    } else {
      card.classList.add('fade-out');
    }
  });
  
  // 延迟发送事件，等待动画完成
  setTimeout(() => {
    emit('select', type);
  }, 500);
}
</script>

<style scoped>
.agent-selector {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 10px;
}

.agent-cards-container {
  margin-bottom: 15px;
}

.agent-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 12px;
}

.agent-card {
  position: relative;
  height: 0;
  padding-bottom: 133.33%; /* 3:4 比例 (4/3 * 100%) */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.agent-card:hover:not(.disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.card-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.agent-card:hover:not(.disabled) .card-bg {
  opacity: 1;
}

.card-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.card-desc {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* 背景颜色类 */
.bg-coach {
  background: linear-gradient(135deg, #4A90E2, #56C271);
}

.bg-mind {
  background: linear-gradient(135deg, #56C271, #4A90E2);
}

.bg-health {
  background: linear-gradient(135deg, #F6D365, #FDA085);
}

.bg-relation {
  background: linear-gradient(135deg, #A6C0FE, #F68084);
}

/* 禁用状态 */
.agent-card.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 选中和淡出动画 */
.agent-card.selected {
  animation: zoom-in 0.5s forwards;
}

.agent-card.fade-out {
  animation: fade-out 0.5s forwards;
}

@keyframes zoom-in {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1.1);
    opacity: 0;
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(20px);
  }
}

/* 响应式布局 */
@media (max-width: 400px) {
  .agent-selector {
    width: 100%;
    padding: 0;
  }
  
  .agent-cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  
  .card-title {
    font-size: 0.9rem;
    margin-bottom: 4px;
  }
  
  .card-desc {
    font-size: 0.7rem;
  }
}
</style>
