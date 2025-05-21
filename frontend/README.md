# ALiveMe Vue 前端项目

## 项目概述

ALiveMe是一个融合AI、心理学与游戏化的社区平台，帮助用户提升自我认知与人际链接。本项目是将原HTML静态网站转化为基于Vue 3 + Vite的现代化前端应用。

## 技术栈

- **框架**: Vue 3 (使用Composition API和`<script setup>`语法)
- **构建工具**: Vite
- **路由**: Vue Router
- **UI组件库**: Element Plus
- **CSS工具**: TailwindCSS

## 项目结构

```
src/
├── assets/         # 静态资源：图像、图标、字体
├── components/     # 可复用组件
│   ├── common/     # 通用UI组件（按钮、卡片等）
│   ├── home/       # 首页各个部分的组件
│   ├── layout/     # 布局相关组件（导航栏、页脚等）
│   ├── oh-card/    # OH卡功能相关组件
│   └── ...
├── views/          # 页面组件，对应路由
│   ├── Home.vue    # 首页
│   ├── OHCard.vue  # OH卡页面
│   ├── LifeExchange.vue # 交换人生页面
│   └── WomenUnlimited.vue # 无界女性页面
├── router/         # 路由配置
├── store/          # 状态管理（使用Pinia或Vuex）
├── services/       # API接口封装
├── composables/    # 组合式函数（自定义hooks）
├── utils/          # 工具函数
├── styles/         # 全局样式
├── App.vue         # 根组件
└── main.js         # 应用入口
```

## 组件设计思路

### 1. 布局组件 (Layout)

使用嵌套布局的方式，将页面的共同部分（如导航栏、页脚）抽离出来：

- `MainLayout.vue`: 主布局组件，包含导航栏和页脚
- `NavBar.vue`: 导航栏组件
- `AppFooter.vue`: 页脚组件

### 2. 页面组件 (Views)

每个页面对应一个路由，组织该页面的整体结构：

- `Home.vue`: 首页，组合多个部分组件
- `OHCard.vue`: OH卡体验页面
- `LifeExchange.vue`: 交换人生桌游页面
- `WomenUnlimited.vue`: 无界女性活动页面

### 3. 部分组件 (Sections)

将页面拆分为多个部分，每个部分作为一个组件：

- 首页部分: `HeroSection`, `AboutSection`, `TeamSection`等
- OH卡部分: `OHCardIntro`, `OHCardGame`等
- 交换人生部分: `GameIntro`, `GameRules`等
- 无界女性部分: `EventInfo`, `Registration`等

### 4. 通用组件 (Common)

可在多个页面复用的UI组件：

- `BaseButton.vue`: 按钮组件
- `BaseCard.vue`: 卡片组件
- `BaseModal.vue`: 模态框组件
- `AnimatedSection.vue`: 带动画效果的部分组件

## OH卡组件拆分指南

当前的OHCard.vue文件有超过1500行代码，远超推荐的300行上限。为了提高代码可维护性和复用性，应将其拆分为以下组件：

### 1. 组件拆分结构

```
components/oh-card/
├── OHCardHero.vue              # OH卡页面顶部英雄区域
├── OHCardGame/                 # OH卡游戏核心组件
│   ├── index.vue               # 游戏主容器
│   ├── IntroStep.vue           # 步骤1：游戏介绍
│   ├── EnergyGatheringStep.vue # 步骤2：能量收集
│   ├── CardDrawingStep.vue     # 步骤3：抽卡和问题
│   ├── CardFront.vue           # 卡片正面
│   ├── CardBack.vue            # 卡片背面
│   ├── QuestionOption.vue      # 问题选项
│   └── FinalStep.vue           # 完成步骤
├── OHCardModals/               # 模态框组件
│   ├── RedrawConfirmation.vue  # 重抽确认模态框
│   └── ImagePreview.vue        # 图片预览模态框
├── OHCardProcess.vue           # OH卡流程介绍部分
├── OHCardIntroduction.vue      # OH卡介绍部分
└── OHCardPhotoGallery.vue      # 活动照片展示
```

### 2. 状态管理

将OH卡游戏的状态逻辑抽离到composables中：

```
composables/
└── useOHCard.js                # OH卡游戏状态和逻辑
```

useOHCard.js应包含：
- 游戏状态（当前步骤、轮次、选中问题等）
- 卡片操作方法（抽卡、翻转、重抽等）
- 问题处理逻辑
- 图片生成和保存功能

### 3. 拆分建议

1. **每个组件职责单一**：每个组件只负责UI的一个特定部分
2. **将样式随组件拆分**：相关样式应随组件一起移动
3. **共享样式抽离**：多个组件共用的样式应放入单独的样式文件
4. **逻辑与UI分离**：游戏逻辑放入composables，UI放入组件
5. **保持组件间通信简单**：使用props向下传递，使用emit向上通知

### 4. 代码量控制原则

- 每个组件文件不超过300行（理想为100-200行）
- 单个函数不超过50行
- 单个模板块不超过100行
- CSS样式按组件拆分，避免全局样式过多

遵循以上原则，可以显著提高代码的可读性、可维护性和可测试性，同时便于团队协作和后续功能扩展。

## 状态管理

使用Pinia进行状态管理，主要存储：

1. 用户信息和认证状态
2. OH卡游戏状态
3. 全局UI状态（如主题设置、模态框显示状态等）

## 路由设计

使用Vue Router管理页面路由：

- `/`: 首页
- `/oh-card`: OH卡体验页面
- `/life-exchange`: 交换人生桌游页面
- `/women-unlimited`: 无界女性活动页面

## 响应式设计

所有页面和组件都采用响应式设计，确保在不同设备上有良好的显示效果：

- 使用TailwindCSS的响应式工具类
- 为移动设备优化交互体验
- 使用媒体查询调整布局和样式

## 动画效果

使用Vue的过渡系统和CSS动画实现各种交互效果：

- 页面切换动画
- 元素进入/离开动画
- 滚动触发的渐显效果
- 交互反馈动画

## 开发规范

- 组件命名采用PascalCase
- 使用Composition API和`<script setup>`语法
- 单个文件代码长度控制在300行以内，理想为100-200行
- 使用ESLint和Prettier保持代码风格一致

## 构建和部署

- 开发环境: `npm run dev`
- 构建生产版本: `npm run build`
- 预览生产版本: `npm run preview`

## 未来计划

1. 集成后端API，实现数据持久化
2. 添加用户认证和个人中心功能
3. 优化OH卡和交换人生游戏体验
4. 增加社区互动功能
5. 支持多语言
