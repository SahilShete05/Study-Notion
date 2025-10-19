const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    console.log("📨 Preparing to send email...");
    console.log("To:", email);
    console.log("Subject:", title);

    // Use explicit SMTP config 
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, //
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, 
      },
    });

    const mailOptions = {
      from: `"StudyNotion" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(" Email sent successfully!");
    console.log("Response:", info.response);
    console.log("Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error(" Nodemailer error:", error.message);
    throw error;
  }
};

module.exports = mailSender;
