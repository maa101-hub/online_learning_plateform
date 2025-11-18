const sendEmail = require('./EmailSender'); // ensure path is correct

const CourseReceiptEmailSender = async ({ to: userEmail, amount, tnx_id, courseTitle }) => {
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
      <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <h2 style="color: #4f46e5;">✅ Course Registration Successful!</h2>
        
        <p>Thank you for enrolling in <strong>${courseTitle}</strong>.</p>

        <h4 style="margin-top: 30px;">🧾 Payment Receipt:</h4>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <tr>
            <td style="padding: 8px;">Course Name:</td>
            <td style="padding: 8px;"><strong>${courseTitle}</strong></td>
          </tr>
          <tr>
            <td style="padding: 8px;">Transaction ID:</td>
            <td style="padding: 8px;">${tnx_id}</td>
          </tr>
          <tr>
            <td style="padding: 8px;">Amount Paid:</td>
            <td style="padding: 8px;"><strong>₹${amount/100}</strong></td>
          </tr>
        </table>

        <p style="margin-top: 30px;">You now have full access to the course materials, lectures, and community.</p>
        <p>We’re excited to have you onboard!</p>

        <p style="margin-top: 30px;">Regards,<br />Team Edu-Verse</p>
      </div>
    </div>
  `;

  try {
    await sendEmail({
      to: userEmail,
      subject: '🎉 Course Enrolled Successfully – Edu-Verse',
      html,
    });
  } catch (err) {
    console.error("❌ Failed to send enrollment email:", err);
    throw err;
  }
};

module.exports = CourseReceiptEmailSender;
