# ALiveMe国际化(i18n)说明文档

## 目录结构

```
src/i18n/
├── index.js                 # i18n配置文件
├── readme_i18n.md           # 本说明文档
└── locales/                 # 语言文件目录
    ├── zh-CN/               # 简体中文
    │   ├── components/      # 组件翻译
    │   │   ├── common/      # 通用组件
    │   │   ├── home/        # 首页组件
    │   │   ├── layout/      # 布局组件
    │   │   ├── oh-card/     # OH卡组件
    │   │   ├── life-exchange/# 交换人生组件
    │   │   └── women-unlimited/# 无界女性组件
    │   ├── views/           # 页面翻译
    │   │   ├── home.js      # 首页
    │   │   ├── ohcard.js    # OH卡页面
    │   │   ├── lifeexchange.js# 交换人生页面
    │   │   └── womenunlimited.js# 无界女性页面
    │   └── common.js        # 通用翻译
    │   └── appfooter.js        # 脚注翻译
    ├── en-US/               # 英文(结构同简体中文)
    └── zh-TW/               # 繁体中文(结构同简体中文)
```

## 使用说明

### 1. 提取文本

从组件和视图中提取需要国际化的文本，按照以下原则进行：

- 按组件和页面的结构组织翻译文件
- 每个组件对应一个翻译文件
- 公共文本放在common.js中

例如，从`src/components/home/HeroSection.vue`组件中提取文本到`src/i18n/locales/zh-CN/components/home/HeroSection.js`：

```javascript
// 原始组件代码
<template>
  <div class="hero-section">
    <h1>爱自己，活出真我</h1>
    <p>融合AI、心理学与游戏化的社区平台</p>
  </div>
</template>

// 提取后的翻译文件 (zh-CN/components/home/HeroSection.js)
export default {
  title: '爱自己，活出真我',
  subtitle: '融合AI、心理学与游戏化的社区平台'
}

// 修改后的组件代码
<template>
  <div class="hero-section">
    <h1>{{ $t('components.home.heroSection.title') }}</h1>
    <p>{{ $t('components.home.heroSection.subtitle') }}</p>
  </div>
</template>
```

### 2. 组织翻译文件

每个语言的翻译文件应保持相同的结构，便于维护和对照：

- 组件翻译放在`components`目录下
- 页面翻译放在`views`目录下
- 通用翻译放在根目录的`common.js`中

### 3. 翻译流程

1. 先完成中文(zh-CN)版本的文本提取
2. 基于中文版本创建英文(en-US)和繁体中文(zh-TW)的翻译文件
3. 进行翻译工作
4. 在组件中使用`$t`函数引用翻译文本

### 4. 命名规范

翻译键名应遵循以下命名规范：

- 使用点号分隔层级：`components.home.heroSection.title`
- 使用camelCase命名方式：`heroSection`而非`hero-section`
- 保持键名简洁明了，反映实际内容

### 5. 引用方式

在Vue组件中使用以下方式引用翻译：

```javascript
// 在模板中
{{ $t('components.home.heroSection.title') }}

// 在脚本中
const { t } = useI18n()
const title = t('components.home.heroSection.title')
```

### 6. 添加新文本

添加新的需要国际化的文本时：

1. 在对应的zh-CN翻译文件中添加新的键值对
2. 同步添加到en-US和zh-TW对应的翻译文件中
3. 在组件中使用`$t`函数引用新添加的文本

## 自动化工具

为提高效率，我们提供了以下自动化工具：

1. 翻译同步工具：基于zh-CN自动创建en-US和zh-TW的翻译文件框架
2. 翻译检查工具：检查翻译文件的完整性和一致性
3. 翻译提取工具：从组件中提取需要国际化的文本

## 注意事项

1. 避免在翻译文件中包含HTML标签，应在组件中处理
2. 对于包含变量的文本，使用参数传递方式：`$t('message', { param: value })`
3. 保持翻译文件的结构一致性，便于维护和对照
4. 定期检查翻译文件的完整性，确保所有文本都已翻译 