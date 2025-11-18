const express = require('express');
const router = express.Router();
const redis = require('../db/redisDB');
const sendEmail = require('../utils/OtpEmailSender'); // your nodemailer logic

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

router.post('/', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const otp = generateOTP();
    const otpKey = `otp:${email}`;

    // Store OTP in Redis with 5 min expiry
    await redis.set(otpKey, otp, 300); // 300 seconds = 5 minutes
    
    // Send the email
    await sendEmail({
      to: email,
      otp: otp,
    });

    res.status(200).json({ message: 'OTP sent to email successfully' });

  } catch (error) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});



module.exports = router;
