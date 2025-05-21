<template>
  <!-- How It Works Section -->
  <section class="section">
    <div class="container mx-auto px-4">
      <h2 class="section-title text-3xl text-center mb-16">如何使用</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="step-card p-6 fade-in" v-for="(step, index) in steps" :key="index" :style="{ animationDelay: `${index * 0.1}s` }">
          <div class="step-number">{{ index + 1 }}</div>
          <h3 class="text-xl font-bold mb-4">{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  {
    title: '选择角色',
    description: '从多个职业和身份中选择你想体验的角色'
  },
  {
    title: '设定场景',
    description: '选择特定的情境或挑战进行体验'
  },
  {
    title: '开始对话',
    description: '与AI角色进行深度对话，了解职业特点'
  },
  {
    title: '获得启发',
    description: '从体验中获取新的视角和启发'
  }
]
</script>

<style scoped>
.section {
  padding: 80px 0;
}

.section-title {
  color: var(--text-primary);
}

.step-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  padding-top: 3rem;
}

.step-number {
  position: absolute;
  top: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 3rem;
  height: 3rem;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .section {
    padding: 40px 0;
  }
}
</style> 