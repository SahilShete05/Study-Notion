const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // auto-delete after 5 minutes
  },
});

// Function to send verification email using Nodemailer (Gmail)
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "StudyNotion | Email Verification Code",
      emailTemplate(otp)
    );

    if (!mailResponse) {
      console.warn(" Email not sent or Nodemailer returned null");
    } else {
      console.log("Email sent successfully via Gmail SMTP!");
      console.log(" Message ID:", mailResponse.messageId || "No ID");
    }
  } catch (error) {
    console.error(" Error sending verification email:", error.message || error);
  }
}

// Hook: After OTP document is created
OTPSchema.pre("save", async function (next) {
  console.log("OTP created for:", this.email);
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

module.exports = mongoose.model("OTP", OTPSchema);
