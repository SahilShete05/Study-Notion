const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    console.log(" [mailSender] Preparing to send email...");
    console.log("To:", email);
    console.log("Subject:", title);

    const transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE, 
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent successfully! Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error(" [mailSender] Error while sending email:", error);
    return null;
  }
};

module.exports = mailSender;
