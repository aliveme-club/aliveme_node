<template>
  <div class="chat-window rounded-lg shadow-xl mx-auto">
    <div class="chat-header">
      <div class="back-button" @click="handleExit">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFD700" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </div>
      <div class="assistant-mobile-bar">
        <el-button class="assistant-mobile-toggle" @click="handleTogglePanel">
          {{ currentAssistantTitle }}
          <span class="arrow" :class="{ open: showAssistantPanel }">▼</span>
        </el-button>
        <transition name="fade">
          <div v-if="showAssistantPanel" class="assistant-switcher-mobile-panel">
            <el-button 
              v-for="type in assistantTypes" 
              :key="type"
              :type="assistantType === type ? 'primary' : 'default'"
              @click="switchAssistant(type)"
              class="assistant-button"
            >
              {{ $t(`components.chat.Assistants.${type}.title`) }}
            </el-button>
          </div>
        </transition>
      </div>
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
        :placeholder="$t('components.chat.ChatWindow.inputPlaceholder')"
        class="message-input"
        :disabled="isStreaming"
      >
      <button 
        @click="isStreaming ? interruptStream() : sendMessage()" 
        class="send-button"
        :class="{ 'interrupt': isStreaming }"
      >
        <svg v-if="!isStreaming" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="11" fill="white"/>
          <path d="M11 6V16" stroke="#4A90E2" stroke-width="2" stroke-linecap="round"/>
          <path d="M7 10L11 6L15 10" stroke="#4A90E2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="11" fill="white"/>
          <path d="M7 7L15 15" stroke="#FF4B4B" stroke-width="2" stroke-linecap="round"/>
          <path d="M15 7L7 15" stroke="#FF4B4B" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const props = defineProps({
  assistantType: {
    type: String,
    required: true,
    validator: (value) => ['activityAssistant', 'travelAssistant', 'foodAssistant'].includes(value)
  }
});

const emit = defineEmits(['update:assistantType', 'message-sent', 'exit']);

const assistantTypes = ['activityAssistant', 'travelAssistant', 'foodAssistant'];
const userInput = ref('');
const messagesContainer = ref(null);
const messages = ref([]);
const isStreaming = ref(false);
const currentReader = ref(null);

// 折叠面板控制
const showAssistantPanel = ref(false);
const currentAssistantTitle = computed(() => t(`components.chat.Assistants.${props.assistantType}.title`));

const handleTogglePanel = () => {
  showAssistantPanel.value = !showAssistantPanel.value;
};

const switchAssistant = (type) => {
  emit('update:assistantType', type);
  showAssistantPanel.value = false;
};

const handleExit = () => {
  emit('exit');
};

// 初始化欢迎消息
const initializeWelcomeMessage = () => {
  const title = t(`components.chat.Assistants.${props.assistantType}.title`);
  messages.value = [{
    content: t('components.chat.ChatWindow.welcomeMessage', { title }),
    sender: 'assistant',
    time: formatTime(new Date())
  }];
};

// 监听语言变化
watch(locale, () => {
  // 清空消息历史
  messages.value = [];
  // 更新系统提示词
  updateSystemPrompt();
  // 发送新语言的欢迎消息
  nextTick(() => {
    initializeWelcomeMessage();
    scrollChatToBottom();
  });
});

// 监听助手类型变化
watch(() => props.assistantType, () => {
  // 清空消息历史
  messages.value = [];
  // 更新系统提示词
  updateSystemPrompt();
  // 发送新助手的欢迎消息
  nextTick(() => {
    initializeWelcomeMessage();
    scrollChatToBottom();
  });
});

// 初始化欢迎消息
initializeWelcomeMessage();

// API Configuration from environment variables
const OPENAI_BASE_URL = import.meta.env.VITE_OPENAI_BASE_URL;
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_MODEL = import.meta.env.VITE_OPENAI_MODEL || 'deepseek-chat';
let SYSTEM_PROMPT = '';

// 更新系统提示词函数
const updateSystemPrompt = () => {
  SYSTEM_PROMPT = t(`components.chat.Assistants.${props.assistantType}.systemPrompt`);
};

// 初始化系统提示词
updateSystemPrompt();

const MAX_CONVERSATION_HISTORY_ROUNDS = 3;

function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

const scrollChatToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

const sendMessage = async () => {
  if (!userInput.value.trim() || isStreaming.value) return;
  
  // 确保系统提示词是最新的
  updateSystemPrompt();
  
  messages.value.push({
    content: userInput.value,
    sender: 'user',
    time: formatTime(new Date())
  });
  
  const currentUserMessage = userInput.value;
  userInput.value = '';
  
  await scrollChatToBottom();

  const constructApiMessages = () => {
    const relevantHistory = messages.value.slice(-(MAX_CONVERSATION_HISTORY_ROUNDS * 2 + 1));
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...relevantHistory.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.content
      }))
    ];
    
    return apiMessages;
  };

  const apiMessages = constructApiMessages();
  
  if (!OPENAI_BASE_URL || !OPENAI_API_KEY || !OPENAI_MODEL) {
    console.error('[API配置错误] VITE_OPENAI_BASE_URL, VITE_OPENAI_API_KEY, and VITE_OPENAI_MODEL 必须在 .env 文件中设置。');
    messages.value.push({
      content: t('components.chat.ChatWindow.configError'),
      sender: 'assistant',
      time: formatTime(new Date())
    });
    await scrollChatToBottom();
    return;
  }
  
  try {
    const response = await fetch(`${OPENAI_BASE_URL}/v4/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: apiMessages,
        stream: true,
      })
    });

    if (!response.ok) {
      let errorDetails = response.statusText;
      try {
        const errorData = await response.json();
        errorDetails = errorData.error?.message || errorData.message || JSON.stringify(errorData);
      } catch (e) {
        // 无法解析错误响应
      }
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorDetails}`);
    }

    if (!response.body) {
      throw new Error('Response body is null');
    }

    const reader = response.body.getReader();
    currentReader.value = reader;
    isStreaming.value = true;
    const decoder = new TextDecoder('utf-8');
    let accumulatedContent = '';

    const assistantMessageId = messages.value.length;
    messages.value.push({
      content: '',
      sender: 'assistant',
      time: formatTime(new Date())
    });
    await scrollChatToBottom();

    let parsingBuffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      parsingBuffer += decoder.decode(value, { stream: true });
      
      let newlineIndex;
      while ((newlineIndex = parsingBuffer.indexOf('\n')) >= 0) {
        const line = parsingBuffer.substring(0, newlineIndex).trim();
        parsingBuffer = parsingBuffer.substring(newlineIndex + 1);

        if (line.startsWith('data: ')) {
          const jsonStr = line.substring(5).trim();
          if (jsonStr === '[DONE]') {
            // 流处理完成
          } else {
            try {
              const parsed = JSON.parse(jsonStr);
              if (parsed.choices && parsed.choices[0] && parsed.choices[0].delta) {
                const contentChunk = parsed.choices[0].delta.content;
                if (contentChunk) {
                  accumulatedContent += contentChunk;
                  messages.value[assistantMessageId].content = accumulatedContent;
                  await scrollChatToBottom();
                }
              }
            } catch (e) {
              // 忽略流解析错误
            }
          }
        }
      }
    }

  } catch (error) {
    messages.value.push({
      content: t('components.chat.ChatWindow.errorMessage', { error: error.message }),
      sender: 'assistant',
      time: formatTime(new Date())
    });
  } finally {
    isStreaming.value = false;
    currentReader.value = null;
    await scrollChatToBottom();
  }
};

const interruptStream = async () => {
  if (currentReader.value) {
    try {
      await currentReader.value.cancel();
      isStreaming.value = false;
      currentReader.value = null;
    } catch (error) {
      // 忽略错误
    }
  }
};
</script>

<style scoped>
.chat-window {  
  width: 100%;  
  max-width: 540px;  
  height: 500px;  
  background-color: #fff;  
  display: flex;  
  flex-direction: column;  
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);  
  border-radius: 12px;  
  overflow: hidden;
}
  
@media (max-width: 640px) {
  .chat-window {
    max-width: 100vw;
    width: 100vw;
    min-width: 0;
    height: 500px;
    min-height: 450px;
    max-height: 100vh;
  }
}

.chat-header {
  background: linear-gradient(to right, #4A90E2, #56C271);
  color: white;
  padding: 15px;
  font-weight: bold;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}

.back-button {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 10;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.back-button:hover {
  background-color: rgba(0, 0, 0, 0.2);
  transform: translateY(-50%) scale(1.1);
}

.assistant-switcher {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  width: 100%;
  justify-content: center;
}

.assistant-button {
  flex: 1 1 120px;
  min-width: 120px;
  max-width: 100%;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  padding: 0 8px;
  font-size: 0.95rem;
}

@media (max-width: 640px) {
  .assistant-button {
    flex: 1 1 100%;
    min-width: 90px;
    font-size: 0.92rem;
    margin-bottom: 2px;
  }
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
  padding: 0;
}

.send-button:hover {
  background-color: #3A80D2;
}

.send-button svg {
  display: block;
}

.assistant-mobile-bar {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4px;
}
.assistant-mobile-toggle {
  width: 100%;
  font-size: 1.1rem;
  border-radius: 8px;
  background: transparent !important;
  color: #fff !important;
  border: none;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
.arrow {
  margin-left: 8px;
  font-size: 0.9em;
  transition: transform 0.2s;
}
.arrow.open {
  transform: rotate(180deg);
}
.assistant-switcher-mobile-panel {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 2px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
@media (max-width: 640px) {
  .assistant-switcher {
    display: none !important;
  }
}

.send-button.interrupt {
  background-color: #FF4B4B;
}

.send-button.interrupt:hover {
  background-color: #FF3333;
}

.message-input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}
</style> 