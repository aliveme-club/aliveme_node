# ALiveMe - AI心理社区平台

## 项目简介
ALiveMe是一个融合AI、心理学与游戏化的社区平台，帮助用户提升自我认知与人际链接。通过AI、心理学和游戏化理念驱动的社区工具，为用户提供智能社群管理、去中心化名片网络和三色能量社区等服务。平台特色包括OH卡互动体验、交换人生桌游体验和无界女性活动等心理健康与成长服务。

## 当前开发状况
目前项目已完成了官网前端的Vue重构工作，实现了主要页面和功能组件的开发。下一阶段的开发重点按优先级依次为：

1. **活动推荐页面** - 在前端添加activities.vue页面和相关组件，提升用户体验
2. **中英文切换功能** - 添加国际化支持，扩大用户群体
3. **用户登录和数据管理** - 结合MySQL数据库实现用户认证系统

当前主要集中在前端开发工作，后端和数据库部分将在活动推荐页面完成后进行开发。

## 技术栈
### 前端
- **框架**: Vue 3 (使用Composition API和`<script setup>`语法)
- **构建工具**: Vite
- **路由**: Vue Router
- **状态管理**: Pinia (计划中)
- **UI组件库**: Element Plus
- **CSS工具**: Tailwind CSS
- **HTTP客户端**: Axios

### 后端
- Node.js
- Express.js
- Sequelize
- JWT
- bcrypt
- cors

### 数据库
- MySQL 8.0

## 项目结构
```
aliveme/
├── frontend/                # Vue前端项目
│   ├── src/
│   │   ├── assets/         # 静态资源
│   │   │   └── images/     # 图片资源（各种主题图像）
│   │   │
│   │   ├── components/     # 公共组件
│   │   │   ├── home/       # 首页组件
│   │   │   ├── layout/     # 布局组件
│   │   │   ├── oh-card/    # OH卡组件
│   │   │   ├── life-exchange/ # 交换人生组件
│   │   │   └── women-unlimited/ # 无界女性组件
│   │   │
│   │   ├── views/          # 页面组件
│   │   │   ├── Home.vue    # 首页
│   │   │   ├── OHCard.vue  # OH卡体验页面
│   │   │   ├── LifeExchange.vue # 交换人生页面
│   │   │   └── WomenUnlimited.vue # 无界女性页面
│   │   │
│   │   ├── router/         # 路由配置
│   │   ├── store/          # 状态管理
│   │   ├── api/            # API接口
│   │   ├── utils/          # 工具函数
│   │   ├── composables/    # 组合式函数
│   │   ├── styles/         # 样式文件
│   │   ├── App.vue         # 根组件
│   │   └── main.js         # 入口文件
│   │
│   ├── public/             # 公共资源
│   └── package.json        # 依赖配置
│
├── backend/                 # Node.js后端项目
│   ├── src/
│   │   ├── config/         # 配置文件
│   │   ├── controllers/    # 控制器
│   │   ├── models/         # 数据模型
│   │   ├── routes/         # 路由
│   │   ├── middlewares/    # 中间件
│   │   ├── utils/          # 工具函数
│   │   └── app.js          # 入口文件
│   └── package.json        # 依赖配置
│
└── database/               # 数据库相关
    ├── migrations/         # 数据库迁移文件
    └── seeds/              # 种子数据
```

## 核心功能模块
1. **OH卡互动体验** - 融合AI与心理学的卡牌体验游戏
   - 卡片抽取与翻转
   - 问题互动
   - 能量收集
   - 图片生成与保存

2. **交换人生** - 促进共情能力的桌游体验
   - 角色转换
   - 情境模拟
   - 心理反思

3. **无界女性** - 女性赋能活动平台
   - 活动介绍
   - 报名管理
   - 社群互动

4. **活动管理** (开发中)
   - 活动展示
   - 活动推荐
   - 活动报名
   - 活动记录

5. **用户系统** (计划中)
   - 注册/登录
   - 个人信息管理
   - 权限控制

## 开发原则
1. **组件化**: 将UI拆分为可复用的组件，提高代码复用率
2. **单一职责**: 每个组件和函数只负责一种功能
3. **组合优于继承**: 使用组合式API组合功能
4. **可测试性**: 逻辑与UI分离，便于测试
5. **代码量控制**: 单个文件不超过300行，保持代码可读性

## 开发环境要求
- Node.js >= 16.0.0
- MySQL >= 8.0
- npm >= 7.0.0

## 安装和运行
1. 克隆项目
```bash
git clone [项目地址]
```

2. 安装依赖
```bash
# 前端
cd frontend
npm install

# 后端
cd backend
npm install
```

3. 配置数据库
- 创建MySQL数据库
- 配置backend/src/config/database.js

4. 运行项目
```bash
# 前端
cd frontend
npm run dev

# 后端
cd backend
npm run dev
```

## 开发规范
1. 代码规范
   - 使用ESLint进行代码检查
   - 遵循Vue 3风格指南
   - 使用Prettier进行代码格式化

2. Git提交规范
   - feat: 新功能
   - fix: 修复bug
   - docs: 文档更新
   - style: 代码格式
   - refactor: 重构
   - test: 测试
   - chore: 构建过程或辅助工具的变动

## 部署
1. 前端部署
   - 构建生产环境代码
   - 配置Nginx

2. 后端部署
   - 使用PM2进行进程管理
   - 配置环境变量

## 未来规划
1. 完成活动推荐页面开发
2. 添加中英文切换功能
3. 实现用户登录系统
4. 引入Pinia进行更全面的状态管理
5. 集成后端API实现数据持久化
6. 优化OH卡和交换人生游戏体验

## 联系方式
- 邮箱：sunnyz689@163.com
- 微信：sunnyz689

## 许可证
ICP备案/许可证号：闽ICP备2025094014号-1
[工信部备案查询](https://beian.miit.gov.cn/)
