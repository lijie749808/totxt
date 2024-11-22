const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');

class User {
  static async findByEmail(email) {
    try {
      const result = await pool.query('SELECT * FROM totxt_users WHERE email = $1', [email]);
      return result.rows[0];
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const result = await pool.query('SELECT * FROM totxt_users WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error finding user by id:', error);
      throw error;
    }
  }

  static async create({ email, password, name, verificationToken }) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      console.log('Creating user with data:', { email, name, verificationToken });

      const result = await pool.query(
        `INSERT INTO totxt_users (email, password, name, verification_token)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [email, hashedPassword, name, verificationToken]
      );

      console.log('User created:', result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async verifyEmail(token) {
    try {
      const result = await pool.query(
        `UPDATE totxt_users 
         SET is_verified = TRUE, verification_token = NULL
         WHERE verification_token = $1
         RETURNING *`,
        [token]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error verifying email:', error);
      throw error;
    }
  }

  static async setResetToken(email, resetToken, expires) {
    try {
      const result = await pool.query(
        `UPDATE totxt_users 
         SET reset_password_token = $1, reset_password_expires = $2
         WHERE email = $3
         RETURNING *`,
        [resetToken, expires, email]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error setting reset token:', error);
      throw error;
    }
  }

  static async findByResetToken(token) {
    try {
      const result = await pool.query(
        `SELECT * FROM totxt_users 
         WHERE reset_password_token = $1 
         AND reset_password_expires > NOW()`,
        [token]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error finding user by reset token:', error);
      throw error;
    }
  }

  static async resetPassword(id, password) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const result = await pool.query(
        `UPDATE totxt_users 
         SET password = $1, reset_password_token = NULL, reset_password_expires = NULL
         WHERE id = $2
         RETURNING *`,
        [hashedPassword, id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  }

  static async comparePassword(candidatePassword, hashedPassword) {
    try {
      return bcrypt.compare(candidatePassword, hashedPassword);
    } catch (error) {
      console.error('Error comparing password:', error);
      throw error;
    }
  }
}

module.exports = User;
