const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true, // 使用 SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  }
});

// 验证 transporter 配置
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP 配置错误:', error);
  } else {
    console.log('SMTP 服务器已就绪');
  }
});

const sendVerificationEmail = async (email, token) => {
  try {
    // 使用查询参数格式
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

    const mailOptions = {
      from: `"ToTxt" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '验证您的 ToTxt 账户',
      html: `
        <h1>欢迎使用 ToTxt</h1>
        <p>请点击下面的链接验证您的邮箱地址：</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
        <p>如果您没有注册 ToTxt 账户，请忽略此邮件。</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('邮件发送成功:', info.response);
    return info;
  } catch (error) {
    console.error('邮件发送失败:', error);
    throw error;
  }
};

const sendPasswordResetEmail = async (email, token) => {
  try {
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const mailOptions = {
      from: `"ToTxt" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'ToTxt 密码重置',
      html: `
        <h1>密码重置请求</h1>
        <p>您收到此邮件是因为您（或其他人）请求重置您的 ToTxt 账户密码。</p>
        <p>请点击下面的链接重置密码：</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>如果您没有请求重置密码，请忽略此邮件。</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('重置密码邮件发送成功:', info.response);
    return info;
  } catch (error) {
    console.error('重置密码邮件发送失败:', error);
    throw error;
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail
};
