const express = require('express');
const router = express.Router();
const pool = require('../../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

const asyncHandler = require('../../utils/asyncHandler');
const AppError = require('../../utils/AppError');

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // 1. Find user in DB
    const result = await pool.query('SELECT * FROM teacher WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      throw new AppError('Invalid email or password', 400);
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError('Invalid email or password', 400);
    }

    // 3. Create JWT
    const token = jwt.sign({ id: user.id, email: user.email, role: 'teacher' }, SECRET, {
      expiresIn: '1h',
    });

    // 4. Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      maxAge: 60 * 60 * 1000,
    });

    // 5. Return success
    res.status(200).json({ message: 'Login successful' });
  })
);

module.exports = router;
