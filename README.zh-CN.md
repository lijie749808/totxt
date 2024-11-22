# ToTxt

[English](README.md) | [简体中文](README.zh-CN.md)

一个现代化的文件转文本应用，专注于高效的 PDF 文本提取和用户管理。

## 功能特点

- PDF 文本提取
  - 使用 PDF.js 进行高效文本提取
  - 支持多页文档
  - 页码和格式化
  - 实时转换进度跟踪

- 用户管理
  - 用户注册和登录
  - 邮箱验证
  - 密码重置功能
  - 用户仪表盘

- 更多文件格式支持（即将推出）
  - Microsoft Word 文档 (.docx)
  - Excel 表格 (.xlsx)
  - 图片（支持 OCR）
  - Markdown 文件

## 项目结构

```
totxt/
├── client/             # 前端应用
│   ├── public/         # 静态文件
│   │   ├── index.html
│   │   └── manifest.json
│   └── src/
│       ├── components/ # React 组件
│       ├── layouts/    # 布局组件
│       ├── pages/      # 页面组件
│       ├── services/   # 业务逻辑
│       ├── styles/     # CSS 样式
│       ├── utils/      # 工具函数
│       └── workers/    # Web Workers
├── server/             # 后端应用
│   ├── config/         # 配置文件
│   ├── controllers/    # 请求处理器
│   ├── models/         # 数据库模型
│   ├── routes/         # API 路由
│   └── utils/          # 工具函数
└── scripts/            # 构建脚本
```

## 核心模块

### 前端

#### 1. 布局组件
- **导航栏**
  * Logo 和品牌
  * 导航菜单
  * 主题切换（明/暗）
  * 用户菜单/登录按钮
- **页脚**
  * 版权信息
  * 社交媒体链接

#### 2. 主要功能
- **首页**
  * 功能亮点
  * 快速入门指南
- **功能页面**
  * 文件转换界面
  * 转换历史
- **文档中心**
  * 用户指南
  * API 文档
  * 常见问题

#### 3. 用户系统
- **身份验证**
  * 登录/注册
  * 邮箱验证
  * 密码重置
- **用户仪表盘**
  * 个人资料管理
  * 使用历史
  * 设置

### 后端

#### 1. API 端点
- **身份验证**
  * 用户注册
  * 用户登录
  * 邮箱验证
  * 密码重置
- **用户管理**
  * 个人资料更新
  * 设置管理

#### 2. 数据库
- MongoDB 用户数据存储
- Mongoose ODM 数据建模

## 技术栈

### 前端
- 框架：React
- UI 框架：Chakra UI
- PDF 处理：PDF.js
- 状态管理：Context API
- 路由：React Router

### 后端
- 运行时：Node.js
- 框架：Express
- 数据库：MongoDB
- ODM：Mongoose
- 身份验证：JWT
- 邮件：Nodemailer

## 快速开始

### 前置条件

- Node.js（v14 或更高版本）
- npm 或 yarn
- MongoDB

### 安装

1. 克隆仓库：
```bash
git clone https://github.com/lijie749808/totxt.git
cd totxt
```

2. 安装依赖：
```bash
# 安装前端依赖
cd client
npm install

# 安装后端依赖
cd ../server
npm install
```

3. 配置环境变量：
在 server 目录下创建 `.env` 文件，包含以下变量：
```
MONGODB_URI=你的mongodb链接
JWT_SECRET=你的jwt密钥
EMAIL_USER=你的邮箱
EMAIL_PASS=你的邮箱密码
```

4. 启动开发服务器：
```bash
# 启动后端服务器（在 server 目录下）
npm start
# 服务器将运行在 http://localhost:5000

# 启动前端开发服务器（在 client 目录下）
cd ../client
npm start
# 客户端将运行在 http://localhost:3000
```

## 开发

### 运行测试
```bash
# 运行前端测试
cd client
npm test

# 运行后端测试
cd ../server
npm test
```

### 代码风格
- ESLint 用于代码检查
- Prettier 用于代码格式化

## 贡献

欢迎提交 Pull Request！请确保：
1. 编写清晰的提交信息
2. 遵循现有的代码风格
3. 为新功能添加测试

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## 致谢

- [PDF.js](https://mozilla.github.io/pdf.js/) - PDF 渲染引擎
- [Chakra UI](https://chakra-ui.com/) - UI 组件库
- [Create React App](https://create-react-app.dev/) - React 应用脚手架
- [Express](https://expressjs.com/) - 后端框架
- [MongoDB](https://www.mongodb.com/) - 数据库
