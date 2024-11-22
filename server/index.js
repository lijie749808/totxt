const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

// 加载环境变量
dotenv.config();

// 连接数据库
console.log('Starting server...');
console.log('Connecting to database...');
connectDB();

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 请求日志中间件
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// 路由
app.use('/api/auth', require('./routes/auth'));

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: '服务器错误' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoints:`);
  console.log(` - POST /api/auth/register - 用户注册`);
  console.log(` - POST /api/auth/login - 用户登录`);
  console.log(` - GET /api/auth/verify-email/:token - 验证邮箱`);
  console.log(` - POST /api/auth/forgot-password - 忘记密码`);
  console.log(` - POST /api/auth/reset-password/:token - 重置密码`);
  console.log(` - GET /api/auth/me - 获取当前用户信息`);
});
