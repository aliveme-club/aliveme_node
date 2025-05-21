# ALiveMe国际化任务清单

## 需要删除的不符合新结构的文件
- [x] frontend/src/i18n/locales/zh-CN.js
- [x] frontend/src/i18n/locales/en-US.js
- [x] frontend/src/i18n/locales/zh-TW.js
- [x] frontend/src/i18n/locales/zh-CN/nav.js
- [x] frontend/src/i18n/locales/zh-CN/home.js
- [x] frontend/src/i18n/locales/zh-CN/ohcard.js
- [x] frontend/src/i18n/locales/zh-CN/lifeexchange.js
- [x] frontend/src/i18n/locales/zh-CN/womenunlimited.js
- [x] frontend/src/i18n/locales/zh-CN/footer.js

## 需要国际化的组件文件

### 视图组件 (views)
- [x] Home.vue - 首页
- [x] OHCard.vue - OH卡体验页面
- [x] LifeExchange.vue - 交换人生页面
- [x] WomenUnlimited.vue - 无界女性页面

### 布局组件 (components/layout)
- [x] MainLayout.vue - 主布局组件
- [x] NavBar.vue - 导航栏组件
- [x] AppFooter.vue - 页脚组件

### 通用组件 (components/common)
- [x] LanguageSwitcher.vue - 语言切换器组件

### 首页组件 (components/home)
- [x] HeroSection.vue - 首页顶部大图区域
- [x] AboutSection.vue - "关于我们"部分
- [x] FeaturesSection.vue - 功能特点展示部分
- [x] TeamSection.vue - 团队成员展示
- [x] TimelineSection.vue - 时间线展示部分
- [x] PostersSection.vue - 海报展示部分
- [x] PartnersSection.vue - 合作伙伴展示
- [x] CollaborationSection.vue - 合作方式展示
- [x] EnergyCommunitySection.vue - 能量社区介绍部分

### OH卡组件 (components/oh-card)
- [x] OHCardHero.vue - OH卡页面顶部区域
- [x] OHCardProcess.vue - OH卡使用流程介绍
- [x] OHCardIntroduction.vue - OH卡详细介绍
- [x] OHCardGame/index.vue - OH卡游戏主容器
- [x] OHCardGame/IntroStep.vue - 游戏介绍步骤
- [x] OHCardGame/EnergyGatheringStep.vue - 能量收集步骤
- [x] OHCardGame/CardDrawingStep.vue - 抽卡和问题步骤
- [x] OHCardGame/CardFront.vue - 卡片正面组件
- [x] OHCardGame/CardBack.vue - 卡片背面组件
- [x] OHCardGame/QuestionOption.vue - 问题选项组件
- [x] OHCardGame/FinalStep.vue - 游戏完成步骤
- [x] OHCardModals/SimpleModal.vue - 简单模态框组件
- [x] OHCardModals/RedrawConfirmation.vue - 重抽确认模态框

### 交换人生组件 (components/life-exchange)
- [x] HeroSection.vue - 交换人生页面顶部区域
- [x] GameIntroSection.vue - 游戏介绍部分
- [x] GameFeaturesSection.vue - 游戏特点展示
- [x] HowItWorksSection.vue - 游戏流程说明
- [x] FeaturesSection.vue - 特点展示部分

### 无界女性组件 (components/women-unlimited)
- [x] WomenUnlimitedHeroSection.vue - 无界女性页面顶部区域
- [x] WomenUnlimitedContentSection.vue - 无界女性内容部分

## 国际化执行步骤
1. [x] 删除不符合新结构的文件
2. [x] 为每个组件创建对应的国际化文件
3. [x] 修改组件中的文本，使用正确的国际化键名（已完成部分）
4. [x] 测试国际化效果 