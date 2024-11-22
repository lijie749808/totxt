const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// 注册路由
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('请输入有效的邮箱地址'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('密码长度至少为 6 个字符'),
    body('name').trim().notEmpty().withMessage('请输入姓名'),
  ],
  authController.register
);

// 登录路由
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('请输入有效的邮箱地址'),
    body('password').notEmpty().withMessage('请输入密码'),
  ],
  authController.login
);

// 验证邮箱路由
router.get('/verify-email', authController.verifyEmail);

// 获取当前用户信息路由
router.get('/me', protect, authController.getCurrentUser);

module.exports = router;
