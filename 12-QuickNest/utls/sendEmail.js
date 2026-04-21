import transporter from "../config/email.js";

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const mailOptions = {
      from: `"QuickNest" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    return info;
  } catch (error) {
    throw new Error("Email sending failed: " + error.message);
  }
};

export default sendEmail;