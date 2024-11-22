const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;

    // 从请求头中获取 token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: '未授权访问' });
    }

    try {
      // 验证 token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 获取用户信息
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: '用户不存在' });
      }

      // 从用户对象中移除密码
      const { password, ...userWithoutPassword } = user;

      // 将用户信息添加到请求对象
      req.user = userWithoutPassword;
      next();
    } catch (error) {
      return res.status(401).json({ message: '无效的 token' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};
