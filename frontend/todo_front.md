# ALiveMe前端国际化任务清单

## 国际化框架设置

- [x] 安装Vue I18n依赖
  - [x] 执行`npm install vue-i18n@next`安装Vue I18n (Vue 3兼容版本)
  - [x] 在package.json中确认依赖已正确添加

- [x] 配置Vue I18n
  - [x] 在src目录下创建i18n文件夹
  - [x] 创建i18n/index.js配置文件
  - [x] 在main.js中导入并注册i18n插件

## 语言文件创建与优化

- [x] 创建语言文件结构
  - [x] 创建src/i18n/locales文件夹
  - [x] 创建zh-CN.js (简体中文)
  - [x] 创建en-US.js (英文)
  - [x] 创建zh-TW.js (繁体中文)

- [x] 提取页面文本
  - [x] 首页(Home.vue)文本提取
  - [x] OH卡页面(OHCard.vue)文本提取
  - [x] 交换人生页面(LifeExchange.vue)文本提取
  - [x] 无界女性页面(WomenUnlimited.vue)文本提取
  - [x] 布局组件文本提取

- [x] 语言文件优化
  - [x] 将语言文件按模块拆分，避免单文件过长
    - [x] 拆分common.js (通用词汇)
    - [x] 拆分nav.js (导航相关)
    - [x] 拆分home.js (首页相关)
    - [x] 拆分ohcard.js (OH卡相关)
    - [x] 拆分lifeexchange.js (交换人生相关)
    - [x] 拆分womenunlimited.js (无界女性相关)
    - [x] 拆分footer.js (页脚相关)
  - [x] 修改i18n/index.js以支持模块化语言文件

## 组件国际化改造

- [x] 创建语言切换组件
  - [x] 创建src/components/common/LanguageSwitcher.vue组件
  - [x] 实现语言切换下拉菜单
  - [x] 添加语言图标

- [x] 改造布局组件
  - [x] 改造NavBar.vue，添加语言切换组件
  - [x] 改造AppFooter.vue，使用$t函数替换静态文本

- [ ] 改造首页组件
  - [x] 改造HeroSection.vue
  - [ ] 改造AboutSection.vue
  - [ ] 改造FeaturesSection.vue
  - [ ] 改造TeamSection.vue
  - [ ] 改造TimelineSection.vue
  - [ ] 改造PartnersSection.vue
  - [ ] 改造CollaborationSection.vue
  - [ ] 改造EnergyCommunitySection.vue
  - [ ] 改造PostersSection.vue

- [ ] 改造OH卡页面组件
  - [ ] 改造OHCardHero.vue
  - [ ] 改造OHCardProcess.vue
  - [ ] 改造OHCardIntroduction.vue
  - [ ] 改造OHCardGame相关组件
    - [ ] 改造index.vue
    - [ ] 改造IntroStep.vue
    - [ ] 改造EnergyGatheringStep.vue
    - [ ] 改造CardDrawingStep.vue
    - [ ] 改造CardFront.vue
    - [ ] 改造CardBack.vue
    - [ ] 改造QuestionOption.vue
    - [ ] 改造FinalStep.vue
  - [ ] 改造OHCardModals组件
    - [ ] 改造SimpleModal.vue
    - [ ] 改造RedrawConfirmation.vue

- [ ] 改造交换人生页面组件
  - [ ] 改造HeroSection.vue
  - [ ] 改造GameIntroSection.vue
  - [ ] 改造GameFeaturesSection.vue
  - [ ] 改造HowItWorksSection.vue
  - [ ] 改造FeaturesSection.vue

- [ ] 改造无界女性页面组件
  - [ ] 改造WomenUnlimitedHeroSection.vue
  - [ ] 改造WomenUnlimitedContentSection.vue

## 其他国际化功能

- [x] 语言持久化
  - [x] 实现语言选择的本地存储
  - [x] 添加自动检测浏览器语言功能

- [ ] 动态加载语言包
  - [ ] 实现按需加载语言文件以减小初始加载体积

- [ ] 日期和数字格式化
  - [ ] 配置日期国际化格式
  - [ ] 配置数字国际化格式

## 测试与优化

- [ ] 测试所有页面在不同语言下的显示
  - [ ] 简体中文测试
  - [ ] 英文测试
  - [ ] 繁体中文测试

- [ ] UI调整
  - [ ] 调整各语言下的文本布局
  - [ ] 解决文本长度差异导致的UI问题

- [ ] 性能优化
  - [ ] 优化国际化资源加载
  - [ ] 减少不必要的重渲染

## 文档

- [ ] 编写国际化使用文档
  - [ ] 为开发者编写如何添加新文本的指南
  - [ ] 文档化国际化开发流程

## 预估工作量

1. **国际化框架设置**: 约1天 (已完成)
2. **语言文件创建与优化**: 约4-5天
3. **组件国际化改造**: 约7-10天
4. **其他国际化功能**: 约2天
5. **测试与优化**: 约2-3天
6. **文档**: 约1天

**总计**: 约17-22个工作日 