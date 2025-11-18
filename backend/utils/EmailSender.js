const nodemailer = require('nodemailer');
require('dotenv').config();

// 1. Configure transporter using Gmail or other SMTP provider
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.APP_EMAIL,       // your Gmail address
    pass: process.env.EMAIL_PASS,   // App password from Google
  },
});

// 2. Send custom email with dynamic HTML and subject
const sendEmail = async ({ to, subject, html }) => {
  try {
    const mailOptions = {
      from: `"Edu-Verse" <${process.env.APP_EMAIL}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
   
  } catch (error) {
    console.error(`❌ Email failed to send to ${to}:`, error);
    throw error;
  }
};

module.exports = sendEmail;
