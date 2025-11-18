const sendEmail = require('./EmailSender'); // Make sure path is correct

const OtpMailSender = async ({to:userEmail, otp}) => {
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Email Verification</h2>
      <p>Your OTP is: <strong>${otp}</strong></p>
      <p>This OTP is valid for 5 minutes.</p>
      <p>Thanks,<br />Team Edu-Verse</p>
    </div>
  `;

  console.log("user email", userEmail);
  

  try {
    await sendEmail({
      to: userEmail,
      subject: 'Verify Your Email - Edu-Verse',
      html,
    });
  } catch (err) {
    console.error("❌ Failed to send OTP email:", err);
    throw err;
  }
};

module.exports = OtpMailSender;
