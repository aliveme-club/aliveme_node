<template>
  <section class="hero-section text-white">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 mb-10 md:mb-0 fade-in hero-text-custom">
          <h1 class="text-4xl md:text-6xl font-bold mb-4">ALiveMe</h1>
          <p class="text-xl md:text-2xl mb-6">{{ $t('components.home.HeroSection.title') }}</p>
          <p class="text-lg mb-8">{{ $t('components.home.HeroSection.description') }}</p>
          <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 cta-buttons-custom">
            <el-button type="primary" size="large" @click="scrollToAbout" class="btn-custom-primary">{{ $t('components.home.HeroSection.actionButton') }}</el-button>
            <router-link to="/ohCard">
              <el-button type="success" size="large" class="btn-custom-oh-card">{{ $t('components.home.HeroSection.joinNow') }}</el-button>
            </router-link>
            <el-button size="large" @click="scrollToContact" class="btn-custom-outline">{{ $t('components.home.HeroSection.contact') }}</el-button>
          </div>
        </div>
        <div class="md:w-1/2 fade-in hero-image-custom" style="animation-delay: 0.3s">
          <div class="chat-window rounded-lg shadow-xl mx-auto">
            <div class="chat-header">
              <div class="chat-title">活动推荐 AI 小助手</div>
            </div>
            <div class="chat-messages" ref="messagesContainer">
              <div v-for="(message, index) in messages" :key="index" 
                   class="message" 
                   :class="message.sender">
                <div class="message-bubble">{{ message.content }}</div>
                <div class="message-time">{{ message.time }}</div>
              </div>
            </div>
            <div class="chat-input">
              <input 
                type="text" 
                v-model="userInput" 
                @keyup.enter="sendMessage"
                placeholder="输入你想说的话..."
                class="message-input"
              >
              <button @click="sendMessage" class="send-button">
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ref, nextTick } from 'vue';
import heroImageUrl from '@/assets/images/team/sunnyonthe38meeting.jpg';

const router = useRouter();
const { t } = useI18n();
const userInput = ref('');
const messagesContainer = ref(null);

// 初始化消息列表
const messages = ref([
  {
    content: '你好，我是你的活动推荐小助手~请说出你的需求',
    sender: 'assistant',
    time: formatTime(new Date())
  }
]);

// 格式化时间
function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

// 滚动聊天窗口到底部
const scrollChatToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// 发送消息
const sendMessage = async () => {
  if (!userInput.value.trim()) return;
  
  // 添加用户消息
  messages.value.push({
    content: userInput.value,
    sender: 'user',
    time: formatTime(new Date())
  });
  
  // 清空输入框
  const userMessage = userInput.value;
  userInput.value = '';
  
  // 滚动聊天窗口到底部
  await nextTick();
  scrollChatToBottom();
  
  // 模拟AI回复延迟
  setTimeout(() => {
    messages.value.push({
      content: '你好，我是你的活动推荐小助手~请说出你的需求',
      sender: 'assistant',
      time: formatTime(new Date())
    });
    
    // 再次滚动聊天窗口到底部
    nextTick(() => {
      scrollChatToBottom();
    });
  }, 500);
};

const scrollToAbout = () => {
  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
};

const scrollToContact = () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
};

const goToOhCard = () => {
  router.push('/oh-card');
};
</script>

<style scoped>
/* Styles adapted from main.html and HeroSection.vue original styles */
.hero-section {
  height: 550px; /* Unified height */
  overflow: hidden; /* Prevent content overflow */
  background: linear-gradient(to right, #56C271, #4A90E2); /* Standardized gradient */
  color: white;
  padding: 80px 0; /* Standardized padding */
  display: flex;
  align-items: center;
}

.container {
  max-width: 1200px; /* Standard container width */
}

/* 聊天窗口样式 */
.chat-window {
  width: 100%;
  max-width: 400px;
  height: 400px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  overflow: hidden;
}

.chat-header {
  background: linear-gradient(to right, #4A90E2, #56C271);
  color: white;
  padding: 15px;
  font-weight: bold;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.chat-messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  display: flex;
  flex-direction: column;
  max-width: 80%;
  margin-bottom: 10px;
}

.message.user {
  align-self: flex-end;
}

.message.assistant {
  align-self: flex-start;
}

.message-bubble {
  padding: 10px 15px;
  border-radius: 18px;
  word-break: break-word;
  line-height: 1.4;
}

.user .message-bubble {
  background-color: #4A90E2;
  color: white;
  border-bottom-right-radius: 4px;
}

.assistant .message-bubble {
  background-color: white;
  color: #333;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.message-time {
  font-size: 0.7rem;
  color: #999;
  margin-top: 4px;
  margin-left: 4px;
  margin-right: 4px;
}

.user .message-time {
  align-self: flex-end;
}

.assistant .message-time {
  align-self: flex-start;
}

.chat-input {
  display: flex;
  padding: 10px;
  background-color: white;
  border-top: 1px solid #eee;
}

.message-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
  margin-right: 10px;
}

.message-input:focus {
  border-color: #4A90E2;
}

.send-button {
  background-color: #4A90E2;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.send-button:hover {
  background-color: #3A80D2;
}

/* Replicating tailwind classes for structure */
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.md\:flex-row {
  /* For medium screens and up */
}

.md\:w-1\/2 {
  /* For medium screens and up */
}

.mb-10 {
  margin-bottom: 2.5rem;
}

.md\:mb-0 {
  /* For medium screens and up */
}

.font-bold {
  font-weight: 700;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.text-4xl {
  font-size: 2.25rem; /* 36px */
}

.md\:text-6xl {
  /* For medium screens and up */
}

.text-xl {
  font-size: 1.25rem; /* 20px */
}

.md\:text-2xl {
  /* For medium screens and up */
}

.text-lg {
  font-size: 1.125rem; /* 18px */
}

.sm\:flex-row {
  /* For small screens and up */
}

.space-y-4 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}

.sm\:space-y-0 > :not([hidden]) ~ :not([hidden]) {
   /* For small screens and up */
}

.sm\:space-x-4 > :not([hidden]) ~ :not([hidden]) {
  /* For small screens and up */
}

.rounded-lg {
  border-radius: 0.5rem; /* 8px */
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
}

/* Custom styles for elements if needed, or rely on Element Plus styles for buttons */
.hero-text-custom {
  /* Specific styles for text block if needed */
}

.hero-image-custom {
  display: flex;
  justify-content: center;
}

.main-image-custom {
  max-height: 500px; 
  object-fit: cover;
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04); /* shadow-xl */
}

.cta-buttons-custom .el-button {
  margin: 0.5rem;
}

.btn-custom-primary.el-button--primary {
  /* Ensure it matches: <a href="#about" class="btn btn-primary bg-white text-primary hover:bg-gray-100"> */
  background-color: white !important;
  color: var(--primary-color, #4A90E2) !important;
  border-color: white !important;
}
.btn-custom-primary.el-button--primary:hover {
  background-color: #f3f4f6 !important; /* gray-100 */
  color: var(--primary-color, #4A90E2) !important;
}

.btn-custom-oh-card.el-button--success {
  background-color: #10b981 !important;
  color: white !important;
  border-color: #10b981 !important;
}
.btn-custom-oh-card.el-button--success:hover {
  background-color: #059669 !important;
  transform: translateY(-2px);
}

.btn-custom-outline.el-button {
  /* Ensure it matches: <a href="#contact" class="btn btn-outline-light border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-primary transition"> */
  background-color: transparent !important;
  color: white !important;
  border: 2px solid white !important;
  /* padding: 0.75rem 2rem; Tailwind px-8 py-3 might be larger for a elements*/
  border-radius: 9999px !important; /* rounded-full */
}

.btn-custom-outline.el-button:hover {
  background-color: white !important;
  color: var(--primary-color, #4A90E2) !important;
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

/* Responsive styles from main.html (Tailwind's md and sm prefixes) */
@media (min-width: 640px) { /* sm */
  .sm\:flex-row {
    flex-direction: row;
  }
  .sm\:space-y-0 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(0px * var(--tw-space-y-reverse));
  }
  .sm\:space-x-4 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(1rem * var(--tw-space-x-reverse));
    margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
  }
}

@media (min-width: 768px) { /* md */
  .md\:flex-row {
    flex-direction: row;
  }
  .md\:w-1\/2 {
    width: 50%;
  }
  .md\:mb-0 {
    margin-bottom: 0;
  }
  .md\:text-6xl {
    font-size: 3.75rem; /* 60px */
  }
  .md\:text-2xl {
    font-size: 1.5rem; /* 24px */
  }
}
</style> 