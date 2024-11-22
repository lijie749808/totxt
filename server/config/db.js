const { Pool } = require('pg');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

// 构建连接字符串
const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

console.log('Connection String:', connectionString);

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log('PostgreSQL Connected');
    
    // 创建用户表
    await pool.query(`
      CREATE TABLE IF NOT EXISTS totxt_users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        is_verified BOOLEAN DEFAULT FALSE,
        verification_token VARCHAR(255),
        reset_password_token VARCHAR(255),
        reset_password_expires TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('totxt_users table created or already exists');
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
    process.exit(1);
  }
};

module.exports = { connectDB, pool };
