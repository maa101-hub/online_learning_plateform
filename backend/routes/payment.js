const express = require('express');
const router = express.Router();
const Razorpay = require("razorpay");
const authenticate = require('../middlewares/authentication');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// POST /api/payment/create-order
router.post('/create-order', authenticate, async (req, res) => {
  try {
    const user_id = req.user.id;

    const {
      name,
      email,
      phone,
      address,
      course_id,
      amount,
      currency = 'INR' // default to INR
    } = req.body;

    // ✅ Validate required fields
    if (!course_id || !amount || !name || !email || !phone || !address) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const order = await razorpay.orders.create({
      amount: parseInt(amount * 100), // Razorpay expects paise
      currency,
      receipt: `order_${course_id}_${user_id}_${Date.now()}`, // ensure unique receipt
      notes: {
        name,
        email,
        phone,
        address
      },
    });

    return res.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return res.status(500).json({ error: 'Failed to create order' });
  }
});

module.exports = router;
