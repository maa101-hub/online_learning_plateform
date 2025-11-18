const express = require('express');
const bcrypt = require('bcrypt');
const asyncHandler = require('../../utils/asyncHandler');
const pool = require('../../db/db');
const redis = require('../../db/redisDB');
const AppError = require('../../utils/AppError');

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email) throw new AppError('Email is required', 400);
  if (!otp) throw new AppError('OTP is required', 400);
  if (!newPassword) throw new AppError('Password is required', 400);

  const otpKey = `otp:${email}`;
  const storedOtp = await redis.get(otpKey);

  if (!storedOtp) {
    throw new AppError('OTP expired or not found', 400);
  }

  if (storedOtp !== otp) {
    throw new AppError('Invalid OTP', 400);
  }

  // Invalidate OTP after successful verification
  await redis.del(otpKey);

  // Check if user exists (you can enhance this by checking both teacher & student)
  const userCheck = await pool.query('SELECT * FROM teacher WHERE email = $1', [email]);
  if (userCheck.rowCount === 0) {
    throw new AppError('Email not found. Please sign up.', 400);
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  await pool.query('UPDATE teacher SET password = $1 WHERE email = $2', [hashedPassword, email]);

  res.status(200).json({ message: 'Password updated successfully' });
}));

module.exports = router;
