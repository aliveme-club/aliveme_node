# ALiveMe 前端架构说明

## 项目概述

ALiveMe是一个融合AI、心理学与游戏化的社区平台，帮助用户提升自我认知与人际链接。本项目是基于Vue 3 + Vite的现代化前端应用，遵循组件化、模块化开发理念。

## 技术栈

- **框架**: Vue 3 (使用Composition API和`<script setup>`语法)
- **构建工具**: Vite
- **路由**: Vue Router
- **UI组件库**: Element Plus
- **CSS工具**: Tailwind CSS

## 项目结构

### 核心文件

- `main.js` - 应用入口文件，负责挂载Vue应用，注册全局插件
- `App.vue` - 根组件，包含应用的基本布局结构
- `style.css` - 全局样式文件

### 扩展目录结构（带文件说明）

```
src/
├── assets/                              # 静态资源
│   └── images/                          # 图片资源（各种主题图像）
│       ├── aliveme/                     # 品牌相关图像
│       ├── charity-camp/                # 公益营相关图像
│       ├── chinese-medicine/            # 中医相关图像
│       ├── events/                      # 活动相关图像
│       ├── life-exchange/               # 交换人生相关图像
│       ├── material/                    # 素材图像
│       ├── partners/                    # 合作伙伴图像
│       ├── patterns/                    # 背景图案
│       ├── posters/                     # 海报图像
│       └── team/                        # 团队成员图像
│
├── components/                          # 可复用组件
│   ├── home/                            # 首页组件
│   │   ├── HeroSection.vue             # 首页顶部大图区域
│   │   ├── AboutSection.vue            # "关于我们"部分
│   │   ├── FeaturesSection.vue         # 功能特点展示部分
│   │   ├── TeamSection.vue             # 团队成员展示
│   │   ├── TimelineSection.vue         # 时间线展示部分
│   │   ├── PostersSection.vue          # 海报展示部分
│   │   ├── PartnersSection.vue         # 合作伙伴展示
│   │   ├── CollaborationSection.vue    # 合作方式展示
│   │   └── EnergyCommunitySection.vue  # 能量社区介绍部分
│   │
│   ├── layout/                          # 布局组件
│   │   ├── MainLayout.vue              # 主布局组件，包含导航栏和页脚的页面基本框架
│   │   ├── NavBar.vue                  # 导航栏组件，实现响应式导航菜单
│   │   └── AppFooter.vue               # 页脚组件，包含版权信息和链接
│   │
│   ├── life-exchange/                   # 交换人生组件（帮助用户体验他人生活视角的互动游戏）
│   │   ├── HeroSection.vue             # 交换人生页面顶部区域
│   │   ├── GameIntroSection.vue        # 游戏介绍部分
│   │   ├── GameFeaturesSection.vue     # 游戏特点展示
│   │   ├── HowItWorksSection.vue       # 游戏流程说明
│   │   └── FeaturesSection.vue         # 特点展示部分
│   │
│   ├── oh-card/                         # OH卡组件（平台核心功能之一，基于心理学原理设计的卡牌互动体验）
│   │   ├── OHCardHero.vue              # OH卡页面顶部区域
│   │   ├── OHCardProcess.vue           # OH卡使用流程介绍
│   │   ├── OHCardIntroduction.vue      # OH卡详细介绍
│   │   │
│   │   ├── OHCardGame/                 # OH卡游戏核心组件
│   │   │   ├── index.vue               # OH卡游戏主容器
│   │   │   ├── IntroStep.vue           # 游戏介绍步骤
│   │   │   ├── EnergyGatheringStep.vue # 能量收集步骤
│   │   │   ├── CardDrawingStep.vue     # 抽卡和问题步骤
│   │   │   ├── CardFront.vue           # 卡片正面组件
│   │   │   ├── CardBack.vue            # 卡片背面组件
│   │   │   ├── QuestionOption.vue      # 问题选项组件
│   │   │   └── FinalStep.vue           # 游戏完成步骤
│   │   │
│   │   └── OHCardModals/               # OH卡模态框组件
│   │       ├── SimpleModal.vue         # 简单模态框组件
│   │       └── RedrawConfirmation.vue  # 重抽确认模态框
│   │
│   └── women-unlimited/                 # 无界女性组件（针对女性赋能的特色活动）
│       ├── WomenUnlimitedHeroSection.vue      # 无界女性页面顶部区域
│       └── WomenUnlimitedContentSection.vue   # 无界女性内容部分
│
├── composables/                         # 组合式函数
│   └── useOHCard.js                     # OH卡游戏状态和逻辑管理，包含：
│                                        # - 游戏状态（当前步骤、问题轮次、卡片状态等）
│                                        # - 卡片操作方法（抽卡、翻转、重抽等）
│                                        # - 问题处理逻辑
│                                        # - 图片生成和保存功能
│                                        # - 预览功能实现
│
├── router/                              # 路由配置
│   └── index.js                         # 定义应用的路由映射，包含：
│                                        # - 首页路由
│                                        # - OH卡页面路由
│                                        # - 交换人生页面路由
│                                        # - 无界女性页面路由
│
├── styles/                              # 样式文件
│   └── main.css                         # 全局样式定义，包含：
│                                        # - 颜色变量
│                                        # - 布局样式
│                                        # - 共享组件样式
│                                        # - 动画效果
│
└── views/                               # 页面组件
    ├── Home.vue                         # 首页，整合多个首页部分组件
    ├── OHCard.vue                       # OH卡体验页面
    ├── LifeExchange.vue                 # 交换人生桌游页面
    └── WomenUnlimited.vue               # 无界女性活动页面
```

## 开发原则

本项目遵循以下开发原则：

1. **组件化**: 将UI拆分为可复用的组件，提高代码复用率
2. **单一职责**: 每个组件和函数只负责一种功能
3. **组合优于继承**: 使用组合式API组合功能
4. **可测试性**: 逻辑与UI分离，便于测试
5. **代码量控制**: 单个文件不超过300行，保持代码可读性

## 特色功能

1. **OH卡互动体验**: 融合AI与心理学的卡牌体验游戏
2. **交换人生**: 促进共情能力的桌游体验
3. **无界女性**: 女性赋能活动平台
4. **响应式设计**: 适配各种设备的用户界面
5. **动画效果**: 丰富的交互动画提升用户体验

## 状态管理

使用Vue 3的Composition API进行状态管理，关键状态包括：

1. OH卡游戏状态 - 在useOHCard.js中管理
2. 用户界面状态 - 在各组件中使用ref和reactive管理
3. 路由状态 - 由Vue Router管理

## 构建与部署

- 开发环境: `npm run dev`
- 生产环境构建: `npm run build`
- 预览生产构建: `npm run preview`

## 未来规划

1. 引入Pinia进行更全面的状态管理
2. 集成后端API实现数据持久化
3. 增加用户认证与个人中心功能
4. 优化OH卡和交换人生游戏体验
5. 支持国际化
