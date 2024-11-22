# ToTxt

[English](README.md) | [简体中文](README.zh-CN.md)

一个现代化的文件转文本 Web 应用，专注于高效的 PDF 文本提取。

## 功能特性

- PDF 文本提取
  - 使用 PDF.js 进行高效文本提取
  - 支持多页文档处理
  - 页码标注和格式化
  - 转换进度实时跟踪

- 更多文件格式支持（即将推出）
  - Microsoft Word 文档 (.docx)
  - Excel 电子表格 (.xlsx)
  - 图片（OCR 支持）
  - Markdown 文件

## 项目结构

```
totxt/
├── public/              # 静态文件
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/      # React 组件
│   │   ├── FileUploader.js
│   │   └── ConversionProgress.js
│   ├── layouts/         # 布局组件
│   │   ├── MainLayout.js
│   │   ├── Navbar.js
│   │   └── Footer.js
│   ├── pages/          # 页面组件
│   │   ├── Home.js     # 首页
│   │   ├── Features.js # 功能页面
│   │   ├── Docs.js    # 文档
│   │   └── User/      # 用户相关页面
│   ├── services/       # 业务逻辑
│   │   └── conversionService.js
│   ├── styles/         # CSS 样式
│   │   └── custom.css
│   ├── utils/          # 工具函数
│   │   └── fileUtils.js
│   └── workers/        # Web Workers
│       └── pdf.worker.js
└── scripts/            # 构建脚本
    └── copy-worker.js
```

## 核心模块

### 1. 布局组件
- **导航栏**
  * Logo 和品牌
  * 导航菜单
  * 主题切换（明/暗）
  * 语言选择器
  * 用户菜单/登录按钮
- **页脚**
  * 版权信息
  * 社交媒体链接
  * 联系方式

### 2. 主要功能
- **首页**
  * 功能亮点
  * 快速入门指南
  * 使用统计
- **功能页面**
  * 文件转换界面
  * 转换历史记录
  * 批量处理
- **文档中心**
  * 用户指南
  * API 文档
  * 常见问题

### 3. 用户系统（即将推出）
- **认证**
  * 登录/注册
  * OAuth 集成
  * 密码重置
- **用户中心**
  * 个人资料管理
  * 使用记录
  * 设置

### 4. 辅助功能
- 搜索功能
- 通知系统
- 帮助中心
- 错误页面（404、500）

## 技术栈

- 前端框架：React
- UI 框架：Chakra UI
- PDF 处理：PDF.js
- 文档处理：
  - Mammoth.js (Word)
  - XLSX.js (Excel)
  - Tesseract.js (OCR)

## 快速开始

### 环境要求

- Node.js（v14 或更高版本）
- npm 或 yarn

### 安装步骤

1. 克隆仓库：
```bash
git clone https://github.com/lijie749808/totxt.git
cd totxt
```

2. 安装依赖：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm start
```

应用将在 `http://localhost:3000` 上运行。

## 使用说明

1. 在浏览器中打开应用
2. 点击上传按钮或直接拖放文件
3. 等待转换完成
4. 提取的文本将显示并可供复制

## 开发指南

### 可用脚本

- `npm start` - 启动开发服务器
- `npm build` - 构建生产版本
- `npm test` - 运行测试
- `npm eject` - 从 Create React App 中弹出配置

## 贡献指南

欢迎提交 Pull Request 来贡献代码！

## 开源协议

本项目采用 MIT 协议 - 详见 [LICENSE](LICENSE) 文件。

## 致谢

- [PDF.js](https://mozilla.github.io/pdf.js/) - PDF 渲染引擎
- [Chakra UI](https://chakra-ui.com/) - UI 组件库
- [Create React App](https://create-react-app.dev/) - React 应用脚手架
