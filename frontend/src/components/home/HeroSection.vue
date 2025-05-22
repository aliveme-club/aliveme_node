<template>
  <section class="hero-section text-white">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 mb-10 md:mb-0 fade-in hero-text-custom">
          <h1 class="text-4xl md:text-6xl font-bold mb-4">ALiveMe</h1>
          <p class="text-xl md:text-2xl mb-6">{{ $t('components.home.HeroSection.title') }}</p>
          <p class="text-lg mb-8">{{ $t('components.home.HeroSection.description') }}</p>
          <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 cta-buttons-custom">
            <div class="cta-row">
              <el-button type="primary" size="large" @click="scrollToAbout" class="btn-cta">{{ $t('components.home.HeroSection.actionButton') }}</el-button>
              <router-link to="/ohCard">
                <el-button type="success" size="large" class="btn-cta">{{ $t('components.home.HeroSection.joinNow') }}</el-button>
              </router-link>
              <el-button size="large" @click="scrollToFooter" class="btn-cta">{{ $t('components.home.HeroSection.contact') }}</el-button>
            </div>
          </div>
        </div>
        <div class="md:w-1/2 fade-in hero-image-custom" style="animation-delay: 0.3s">
          <div class="chat-container">
            <transition name="fade" mode="out-in">
              <AgentSelector v-if="!currentAgent" @select="handleSelectAgent" />
              <div v-else class="chat-window-container">
                <ChatWindow 
                  :assistantType="currentAgent" 
                  @update:assistantType="handleUpdateAssistant"
                  @exit="handleExit"
                />
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import ChatWindow from '@/components/chat/ChatWindow.vue';
import AgentSelector from '@/components/chat/AgentSelector.vue';

const router = useRouter();
const { t } = useI18n();

const currentAgent = ref(null);

const scrollToFooter = () => {
  const footerElement = document.getElementById('contact-footer');
  if (footerElement) {
    footerElement.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const handleMessageSent = () => {
  // 处理消息发送事件
};

const handleSelectAgent = (type) => {
  // 添加一个小延迟使动画效果更明显
  setTimeout(() => {
    currentAgent.value = type;
  }, 100);
};

const handleUpdateAssistant = (type) => {
  currentAgent.value = type;
};

const handleExit = () => {
  currentAgent.value = null;
};

const scrollToAbout = () => {
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  }
};

const scrollToContact = () => {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped>
/* Styles adapted from main.html and HeroSection.vue original styles */
.hero-section {
  min-height: 550px;
  height: auto;
  overflow: visible;
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
  max-width: 540px;
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
  padding: 10px;
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

.assistant-button {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

@media (max-width: 640px) {
  .hero-section {
    height: auto;
    min-height: 0;
    padding: 24px 0 12px 0;
    align-items: flex-start;
  }
  .cta-row {
    gap: 6px;
  }
  .btn-cta.el-button {
    font-size: 0.95rem;
    padding: 0.6rem 0.2rem;
    min-width: 0;
    max-width: 33vw;
  }
  .hero-image-custom {
    width: 100%;
    padding: 0;
  }
  .chat-container {
    width: 100%;
    max-width: 100%;
    margin: 0;
  }
}

.cta-row {
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  justify-content: center;
}

.btn-cta.el-button {
  flex: 1 1 0;
  min-width: 0;
  max-width: 160px;
  font-size: 1rem;
  border-radius: 9999px;
  padding: 0.75rem 0.5rem;
  margin: 0;
  white-space: nowrap;
  box-shadow: none;
  border: 2px solid #fff;
  background-color: #fff !important;
  color: var(--primary-color, #4A90E2) !important;
  transition: background 0.2s, color 0.2s;
}
.btn-cta.el-button:hover {
  background-color: #f3f4f6 !important;
  color: #4A90E2 !important;
}
.btn-cta.el-button--success {
  background-color: #10b981 !important;
  color: #fff !important;
  border-color: #10b981 !important;
}
.btn-cta.el-button--success:hover {
  background-color: #059669 !important;
}

.chat-container {  
  position: relative;  
  width: 100%;  
  max-width: 540px;  
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}
  
.chat-window-container {
  position: relative;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style> 