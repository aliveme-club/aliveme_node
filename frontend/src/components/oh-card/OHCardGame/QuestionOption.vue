<template>
  <div 
    class="question-option" 
    :class="{'selected': isSelected}"
    @click="onSelect"
  >
    {{ question }}
  </div>
</template>

<script setup>
defineProps({
  question: {
    type: String,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select'])

const onSelect = () => {
  emit('select')
}
</script>

<style scoped>
.question-option {
  background-color: white;
  border: 2px solid var(--primary-color, #3498DB);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  color: var(--text-dark, #333);
  cursor: pointer;
  transition: all 0.3s ease;
  line-height: 1.4;
  position: relative;
  overflow: hidden;
}

.question-option::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(52, 152, 219, 0.1);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
  pointer-events: none;
}

.question-option:hover::before {
  opacity: 1;
}

.question-option:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.2);
}

.question-option.selected {
  background-color: var(--primary-color, #3498DB);
  color: white;
  border-color: var(--accent-color, #2980B9);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

.question-option.selected:hover {
  transform: translateY(-2px);
}

.question-option.selected::before {
  background-color: rgba(255, 255, 255, 0.1);
  opacity: 0;
}

.question-option.selected:hover::before {
  opacity: 1;
}

@media (max-width: 768px) {
  .question-option {
    font-size: 1rem;
    padding: 1rem;
  }
}
</style> 