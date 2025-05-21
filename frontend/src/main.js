// 导入环境变量配置
import './env'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import './styles/main.css'
import i18n from './i18n'
import { debugI18n } from './debug-i18n'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(i18n)

// 在启动前调试国际化配置
console.log('Debug i18n before mount:')
debugI18n()

app.mount('#app')

// 监视模态框容器变化
if (process.env.NODE_ENV !== 'production') {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        console.log('[调试] 模态框容器变化:', {
          添加的节点数: mutation.addedNodes.length,
          第一个节点类名: mutation.addedNodes[0].className,
          容器总子节点数: document.getElementById('modals-container').childNodes.length
        });
      }
    }
  });
  
  // 等待DOM加载完成后开始观察
  window.addEventListener('DOMContentLoaded', () => {
    const modalsContainer = document.getElementById('modals-container');
    if (modalsContainer) {
      observer.observe(modalsContainer, { childList: true, subtree: true });
      console.log('[调试] 模态框容器监视已启动');
    } else {
      console.error('[调试] 找不到模态框容器!');
    }
  });
}
