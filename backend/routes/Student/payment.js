const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const pool = require("../../db/db");
const router = express.Router();
const crypto = require("crypto");
const authenticate = require("../../middlewares/authentication");
const CourseReceiptEmailSender = require("../../utils/paymentReciept");
require('dotenv').config();



router.post(
  "/enroll",
  authenticate,
  asyncHandler(async (req, res) => {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      course_id,
      title,
      amount
    } = req.body;

    const student_id = req.user.id;
    const email = req.user.email;


    // 1. Verify Signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // 2. Insert into enrolledCourse
    try {
      await pool.query(
        "INSERT INTO enrolledCourse (course_id, student_id, order_id) VALUES ($1, $2, $3)",
        [course_id, student_id, razorpay_order_id]
      );

    await CourseReceiptEmailSender({
  to: email,
  courseTitle: title,
  amount: amount,
  tnx_id: razorpay_order_id
});

      res.status(200).json({ message: "Course Enrolled Successfully" });
    } catch (err) {
      if (err.code === "23505") {
        res.status(409).json({ message: "Already enrolled in this course." });
      } else {
        throw err;
      }
    }
  })
);

module.exports = router;
