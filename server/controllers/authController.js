const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { pool } = require('../config/db');
const { sendVerificationEmail } = require('../utils/email');

// 注册用户
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 检查用户是否已存在
    const userExists = await pool.query(
      'SELECT * FROM totxt_users WHERE email = $1',
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: '该邮箱已被注册' });
    }

    // 生成验证令牌
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // 加密密码
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 创建用户
    const result = await pool.query(
      'INSERT INTO totxt_users (name, email, password, verification_token, is_verified) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, hashedPassword, verificationToken, false]
    );

    const user = result.rows[0];

    // 发送验证邮件
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      message: '注册成功，请查收验证邮件',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_verified: user.is_verified
      }
    });
  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({ message: '注册失败，请稍后重试' });
  }
};

// 用户登录
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 查找用户
    const result = await pool.query(
      'SELECT * FROM totxt_users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: '邮箱或密码错误' });
    }

    const user = result.rows[0];

    // 验证密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: '邮箱或密码错误' });
    }

    // 检查邮箱是否已验证
    if (!user.is_verified) {
      return res.status(401).json({ message: '请先验证邮箱' });
    }

    // 生成 JWT
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_verified: user.is_verified
      }
    });
  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({ message: '登录失败，请稍后重试' });
  }
};

// 验证邮箱
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: '无效的验证链接' });
    }

    // 查找具有该验证令牌的用户
    const result = await pool.query(
      'SELECT * FROM totxt_users WHERE verification_token = $1',
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: '无效的验证链接' });
    }

    const user = result.rows[0];

    // 如果用户已经验证过了
    if (user.is_verified) {
      return res.status(400).json({ message: '邮箱已经验证过了' });
    }

    // 更新用户验证状态
    await pool.query(
      'UPDATE totxt_users SET is_verified = true, verification_token = null WHERE id = $1',
      [user.id]
    );

    res.json({ message: '邮箱验证成功' });
  } catch (error) {
    console.error('验证邮箱错误:', error);
    res.status(500).json({ message: '验证失败，请稍后重试' });
  }
};

// 获取当前用户信息
const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      is_verified: user.is_verified
    });
  } catch (error) {
    console.error('获取用户信息错误:', error);
    res.status(500).json({ message: '获取用户信息失败' });
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  getCurrentUser
};
