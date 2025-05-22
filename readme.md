# ALiveMe - AI心理社区平台

## 项目简介
ALiveMe是一个融合AI、心理学与游戏化的社区平台，帮助用户提升自我认知与人际链接。通过AI、心理学和游戏化理念驱动的社区工具，为用户提供智能社群管理、去中心化名片网络和三色能量社区等服务。平台特色包括OH卡互动体验、交换人生桌游体验和无界女性活动等心理健康与成长服务。

## 当前开发状况
- 前端：完成Vue 3重构，实现了首页、OH卡、交换人生和无界女性页面，以及聊天系统和国际化框架的基础设置
- 后端：准备阶段，规划中
- 数据库：设计阶段，尚未实现

> **注意**：关于前端详细架构和实现，请参阅 [frontend/readme_front.md](frontend/readme_front.md)

## 优先级开发清单
1. **完善国际化功能** - 完成剩余组件的多语言支持(简体中文、繁体中文、英文)
2. **活动推荐页面** - 添加activities.vue页面和相关组件
3. **用户登录和数据管理** - 结合MySQL数据库实现用户认证系统

## 技术栈
### 前端
- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **UI组件库**: Element Plus
- **国际化**: Vue I18n
- **HTTP客户端**: Axios (计划中)

### 后端 (规划中)
- Node.js
- Express.js
- Sequelize
- JWT
- bcrypt
- cors

### 数据库 (规划中)
- MySQL 8.0

## 项目结构概览
```
aliveme/
├── frontend/                # Vue前端项目
│   ├── src/
│   │   ├── components/     # 组件目录
│   │   │   ├── chat/       # 聊天组件
│   │   │   ├── common/     # 通用组件
│   │   │   ├── home/       # 首页组件
│   │   │   ├── layout/     # 布局组件
│   │   │   ├── oh-card/    # OH卡组件
│   │   │   ├── life-exchange/ # 交换人生组件
│   │   │   └── women-unlimited/ # 无界女性组件
│   │   │
│   │   ├── views/          # 页面组件
│   │   ├── i18n/           # 国际化配置和翻译文件
│   │   ├── router/         # 路由配置
│   │   ├── composables/    # 组合式函数
│   │   └── ...             # 其他目录和文件
│   │
│   ├── readme_front.md     # 前端详细文档
│   └── todo_front.md       # 前端任务清单
│
├── backend/                 # Node.js后端项目 (规划中)
│
└── database/               # 数据库相关 (规划中)
```

## 核心功能模块
1. **OH卡互动体验** - 融合AI与心理学的卡牌体验游戏
2. **交换人生** - 促进共情能力的桌游体验
3. **无界女性** - 女性赋能活动平台
4. **AI助手系统** - 多类型AI助手提供不同领域的咨询服务
5. **多语言支持** - 支持简体中文、繁体中文和英文
6. **活动管理** (开发中) - 活动展示、推荐和报名
7. **用户系统** (计划中) - 注册/登录、个人信息管理

## 协作开发说明
### 前端与后端接口规范
前端将通过RESTful API与后端通信，接口格式将遵循以下规范：

```
1. 请求格式: 
   - GET /api/resource
   - POST /api/resource
   - PUT /api/resource/:id
   - DELETE /api/resource/:id

2. 响应格式:
   {
     "status": 200,
     "message": "操作成功",
     "data": { ... }
   }
```

### 预期API接口 (规划中)
```
1. 用户管理:
   - POST /api/users/register
   - POST /api/users/login
   - GET /api/users/profile
   - PUT /api/users/profile

2. 活动管理:
   - GET /api/activities
   - GET /api/activities/:id
   - POST /api/activities/:id/register

3. 社区管理:
   - GET /api/communities
   - GET /api/communities/:id
   - POST /api/communities
```

## 开发环境要求
- Node.js >= 16.0.0
- npm >= 7.0.0
- MySQL >= 8.0 (数据库阶段使用)

## 安装和运行
1. 克隆项目
```bash
git clone [项目地址]
```

2. 前端开发
```bash
cd frontend
npm install
npm run dev
```

3. 后端开发 (尚未实现)
```bash
cd backend
npm install
npm run dev
```

## 开发规范
1. **代码风格**
   - 使用ESLint进行代码检查
   - 使用Prettier进行代码格式化
   - 遵循组件化、单一职责原则

2. **Git工作流**
   - feature分支: 新功能开发
   - hotfix分支: 线上问题修复
   - develop分支: 开发环境
   - main分支: 生产环境

3. **提交信息规范**
   - feat: 新功能
   - fix: 修复bug
   - docs: 文档更新
   - style: 代码格式
   - refactor: 重构
   - test: 测试
   - chore: 构建过程或辅助工具的变动

## 文档列表
- [前端架构文档](frontend/readme_front.md)
- [前端任务清单](frontend/todo_front.md)
- [已完成任务记录](done_task.md)

## 联系方式
- 邮箱：sunnyz689@163.com
- 微信：sunnyz689

## 许可证
ICP备案/许可证号：闽ICP备2025094014号-1
[工信部备案查询](https://beian.miit.gov.cn/)
