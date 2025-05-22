<template>
  <div class="chat-window rounded-lg shadow-xl mx-auto">
    <div class="chat-header">
      <div class="chat-title">{{ $t(`components.chat.Assistants.${assistantType}.title`) }}</div>
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
      >
      <button @click="sendMessage" class="send-button">
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import prompts from '@/config/prompts.json';

const { t } = useI18n();

const props = defineProps({
  assistantType: {
    type: String,
    required: true,
    validator: (value) => ['activityAssistant', 'travelAssistant', 'foodAssistant'].includes(value)
  }
});

const emit = defineEmits(['message-sent']);

const title = ref(t(`components.chat.Assistants.${props.assistantType}.title`));
const userInput = ref('');
const messagesContainer = ref(null);
const messages = ref([
  {
    content: t('components.chat.ChatWindow.welcomeMessage', { title: title.value }),
    sender: 'assistant',
    time: formatTime(new Date())
  }
]);

// API Configuration from environment variables
const OPENAI_BASE_URL = import.meta.env.VITE_OPENAI_BASE_URL;
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_MODEL = import.meta.env.VITE_OPENAI_MODEL || 'deepseek-chat';
const SYSTEM_PROMPT = t(`components.chat.Assistants.${props.assistantType}.systemPrompt`);
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
  if (!userInput.value.trim()) return;
  console.log(`[用户输入] ${userInput.value}`);

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
    return [
      { role: 'system', content: SYSTEM_PROMPT },
      ...relevantHistory.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.content
      }))
    ];
  };

  const apiMessages = constructApiMessages();
  console.log('[API配置]', {
    baseUrl: OPENAI_BASE_URL,
    model: OPENAI_MODEL,
    fullUrl: `${OPENAI_BASE_URL}/v4/chat/completions`
  });

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
        console.error('[API响应错误主体]', errorData);
      } catch (e) {
        console.error('[API响应错误] 无法解析错误JSON主体', e);
      }
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorDetails}`);
    }

    if (!response.body) {
      throw new Error('Response body is null');
    }

    const reader = response.body.getReader();
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
            console.log('[流处理完成信号]');
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
              console.error('[流数据解析错误]', e, '原始数据:', jsonStr);
            }
          }
        }
      }
    }

  } catch (error) {
    console.error('[调用LLM API或处理流失败]', error);
    messages.value.push({
      content: t('components.chat.ChatWindow.errorMessage', { error: error.message }),
      sender: 'assistant',
      time: formatTime(new Date())
    });
  } finally {
    await scrollChatToBottom();
  }
};
</script>

<style scoped>
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
</style> 