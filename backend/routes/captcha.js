// captchaRoute.js
const express = require('express');
const router = express.Router();
const svgCaptcha = require('svg-captcha');
const redis = require('../db/redisDB'); // Adjust path
const { v4: uuidv4 } = require('uuid');
const AppError = require('../utils/AppError');

// GET /api/captcha
router.get('/', async (req, res) => {
  const captcha = svgCaptcha.create({
    size: 6,
    noise: 3,
    color: true,
    background: '#f0f0f0',
    ignoreChars: '0o1il',
  });

  const captchaId = uuidv4();
  const redisKey = `captcha:${captchaId}`;

  // Store in Redis with 5-minute expiry
  await redis.set(redisKey, captcha.text,300);

  res.status(200).json({
    captchaId,
    svg: captcha.data,
  });
});

// POST /api/verify-captcha
router.post('/verify', async (req, res) => {
  const { captchaId, input } = req.body;
  if (!captchaId || !input) {
   throw new AppError( 'captchaId and input are required', 400);
  }

  const redisKey = `captcha:${captchaId}`;
  const storedCaptcha = await redis.get(redisKey);

  if (!storedCaptcha) {
    throw new AppError('Captcha expired or invalid', 400);
  }

  if (storedCaptcha.toLowerCase() !== input.toLowerCase()) {
    throw new AppError('Captcha invalid !!', 400);
  }

  await redis.del(redisKey);

  res.status(200).json({ message: 'CAPTCHA verified successfully' });
});

module.exports = router;
