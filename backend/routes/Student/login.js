const express = require('express');
const router = express.Router();
const pool = require('../../db/db'); // Adjust path as needed
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find the user in DB
    const result = await pool.query('SELECT * FROM student WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // 2. Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // 3. Create JWT token
    const token = jwt.sign({ id: user.id, email: user.email, role:"student" }, SECRET, {
      expiresIn: '1h',
    });

    // 4. Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',         // Enable only in production (HTTPS)
      sameSite: 'None',
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    // 5. Respond with success
    res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
