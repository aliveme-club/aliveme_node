# ALiveMe国际化(i18n)指南

## 目录结构

```
src/i18n/
├── index.js                # i18n配置文件
├── readme_i18n.md          # 本指南
└── locales/                # 语言文件目录
    ├── zh-CN/              # 简体中文
    ├── en-US/              # 英文
    └── zh-TW/              # 繁体中文
```

## 使用流程

### 1. 创建翻译文件

根据组件路径创建对应的翻译文件，例如：
- 组件：`src/components/home/HeroSection.vue`
- 翻译：`src/i18n/locales/zh-CN/components/home/HeroSection.js`

### 2. 提取与组织翻译文本

```javascript
// 翻译文件 (zh-CN/components/home/HeroSection.js)
export default {
  title: '爱自己，活出真我',
  subtitle: '融合AI、心理学与游戏化的社区平台'
}

// 组件中使用
<template>
  <h1>{{ $t('components.home.HeroSection.title') }}</h1>
  <p>{{ $t('components.home.HeroSection.subtitle') }}</p>
</template>
```

### 3. 处理列表类型数据

```javascript
// 翻译文件
export default {
  features: [
    {
      title: 'AI心理分析',
      description: '通过AI技术提供个性化心理健康建议'
    },
    // 更多特性...
  ]
}

// 在组件中使用
<div v-for="(feature, index) in features" :key="index">
  <h3>{{ $t(`components.home.FeaturesSection.features[${index}].title`) }}</h3>
  <p>{{ $t(`components.home.FeaturesSection.features[${index}].description`) }}</p>
</div>

// Script部分
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { tm } = useI18n();
const features = computed(() => tm('components.home.FeaturesSection.features'));
```

### 4. 更新index.js

1. 导入翻译文件
```javascript
import zhCN_component from './locales/zh-CN/components/path/Component.js'
import enUS_component from './locales/en-US/components/path/Component.js'
import zhTW_component from './locales/zh-TW/components/path/Component.js'
```

2. 在messages对象中注册
```javascript
const messages = {
  'zh-CN': {
    components: {
      path: {
        Component: zhCN_component
      }
    }
  },
  // 其他语言同理
}
```

## 常用翻译方法

### 模板中使用

```javascript
{{ $t('components.path.Component.key') }}
```

### 脚本中使用

```javascript
import { useI18n } from 'vue-i18n'

// 设置脚本
const { t, tm } = useI18n()
const title = t('components.path.Component.title')

// 获取数组或对象类型翻译
const items = tm('components.path.Component.items')
```

### 带参数的翻译

```javascript
// 翻译文件
export default {
  welcome: '你好，{name}!'
}

// 使用
{{ $t('components.path.Component.welcome', { name: userName }) }}
```

## 国际化流程总结

1. 创建组件对应的翻译文件（三种语言）
2. 在组件中使用t/tm函数引用翻译
3. 在index.js中导入和注册翻译文件
4. 测试不同语言下的显示效果

## 注意事项

1. 保持翻译键名一致性，使用camelCase命名
2. 避免在翻译中包含HTML标签
3. 定期检查翻译完整性
4. 对于动态内容，确保正确处理语言切换
5. 复杂翻译（如包含格式化或条件渲染）应在组件中处理 