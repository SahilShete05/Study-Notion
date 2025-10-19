const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    console.log(" [mailSender] Preparing to send email...");
    console.log("To:", email);
    console.log("Subject:", title);

    const transporter = nodemailer.createTransport({
      service: "gmail",
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
    console.log(" [mailSender] Email sent successfully!");
    console.log(" Response:", info.response);
    console.log(" Message ID:", info.messageId);

    return info;
  } catch (error) {
    console.error(" [mailSender] Error while sending email:");
    console.error(error);
  }
};

module.exports = mailSender;
