# ALiveMe - AI心理社区平台

## 项目简介
ALiveMe是一个创新的AI心理社区平台，通过AI、心理学和游戏化理念驱动的名片网社区工具，为用户提供智能社群管理、去中心化名片网络和三色能量社区等服务。

## 技术栈
### 前端
- Vue 3
- Vite
- Vue Router
- Pinia
- Element Plus
- Axios

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
│   │   ├── components/     # 公共组件
│   │   ├── views/          # 页面组件
│   │   ├── router/         # 路由配置
│   │   ├── store/          # 状态管理
│   │   ├── api/            # API接口
│   │   ├── utils/          # 工具函数
│   │   ├── App.vue         # 根组件
│   │   └── main.js         # 入口文件
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
    └── seeds/             # 种子数据
```

## 功能模块
1. 用户系统
   - 注册/登录
   - 个人信息管理
   - 权限控制

2. 社区功能
   - 智能社群管理
   - 去中心化名片网络
   - 三色能量社区

3. 活动管理
   - 活动发布
   - 活动报名
   - 活动记录

4. AI助手
   - 智能问答
   - 社群管理
   - 个性化推荐

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

## 联系方式
- 邮箱：sunnyz689@163.com
- 微信：sunnyz689

## 许可证
ICP备案/许可证号：闽ICP备2025094014号-1
[工信部备案查询](https://beian.miit.gov.cn/)
