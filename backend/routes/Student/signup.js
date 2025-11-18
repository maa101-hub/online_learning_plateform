const express = require('express');
const router = express.Router();
const pool = require('../../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redis = require('../../db/redisDB');
const asyncHandler = require('../../utils/asyncHandler');
const AppError = require('../../utils/AppError');

const SECRET = process.env.JWT_SECRET;

// POST /api/signup
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { email, password, name, otp } = req.body;

     if (!email) throw new AppError('Email is required', 400);
  if (!otp) throw new AppError('OTP is required', 400);
  if (!password) throw new AppError('Password is required', 400);
  if (!name) throw new AppError('name is required', 400);

    const otpKey = `otp:${email}`;
    const storedOtp = await redis.get(otpKey);

    if (!storedOtp) {
      throw new AppError('OTP expired or not found', 400);
    }

    if (storedOtp !== otp) {
      throw new AppError('Invalid OTP', 400);
    }

    // Invalidate OTP after verification
    await redis.del(otpKey);

    // Check if student already exists
    const existingUser = await pool.query('SELECT id FROM student WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      throw new AppError('User already exists with this email', 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await pool.query(
      'INSERT INTO student (email, password, name) VALUES ($1, $2, $3) RETURNING id, email',
      [email, hashedPassword, name]
    );

    const user = result.rows[0];

    // Generate token
    const token = jwt.sign({ id: user.id, email: user.email, role: 'student' }, SECRET, {
      expiresIn: '1h',
    });

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(201).json({ message: 'User created successfully' });
  })
);

module.exports = router;
