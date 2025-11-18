const express = require('express');
const router = express.Router();
const pool = require('../../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redis = require('../../db/redisDB');

const SECRET = process.env.JWT_SECRET;

const asyncHandler = require('../../utils/asyncHandler');
const AppError = require('../../utils/AppError');

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

  // Invalidate OTP after successful verification
  await redis.del(otpKey);

    // 1. Check if user already exists
    const userCheck = await pool.query('SELECT * FROM teacher WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      throw new AppError('User already exists', 400);
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Insert new user
    const newUser = await pool.query(
      'INSERT INTO teacher (email, password, name) VALUES ($1, $2, $3) RETURNING id, email',
      [email, hashedPassword, name]
    );

    const user = newUser.rows[0];

    // 4. Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email, role: 'teacher' }, SECRET, {
      expiresIn: '1h',
    });

    // 5. Set JWT as secure cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    // 6. Respond with success
    res.status(201).json({ message: 'User created successfully' });
  })
);

module.exports = router;
