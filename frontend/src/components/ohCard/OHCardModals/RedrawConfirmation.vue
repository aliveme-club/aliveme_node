<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 max-w-md">
      <h3 class="text-xl font-bold mb-4">{{ $t('components.ohCard.OHCardModals.RedrawConfirmation.title') }}</h3>
      <p class="mb-6">{{ $t('components.ohCard.OHCardModals.RedrawConfirmation.message') }}</p>
      <div class="flex justify-end space-x-4">
        <button 
          class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          @click="onCancel"
        >
          {{ $t('components.ohCard.OHCardModals.RedrawConfirmation.cancelButton') }}
        </button>
        <button 
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          @click="onConfirm"
        >
          {{ $t('components.ohCard.OHCardModals.RedrawConfirmation.confirmButton') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['cancel', 'confirm'])

const onCancel = () => {
  emit('cancel')
}

const onConfirm = () => {
  emit('confirm')
}
</script>

<style scoped>
.fixed {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.bg-white {
  animation: scaleIn 0.3s ease-in-out;
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style> 