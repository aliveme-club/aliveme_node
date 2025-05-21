<template>
  <div v-if="show" class="simple-modal">
    <div class="modal-content">
      <h2>测试模态框</h2>
      <p>这是一个测试模态框，用于验证基本显示功能。</p>
      <button @click="$emit('close')">关闭</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close'])
</script>

<style scoped>
.simple-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  max-width: 500px;
  width: 80%;
  text-align: center;
}

h2 {
  color: #333;
  margin-top: 0;
}

button {
  background-color: #F39C12;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
}

button:hover {
  background-color: #E67E22;
}
</style> 