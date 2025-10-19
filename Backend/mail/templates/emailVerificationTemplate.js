exports.otpTemplate = (otp) => `
  <div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px; border-radius: 10px; max-width: 500px; margin: auto; border: 1px solid #e5e7eb;">
    <h2 style="color: #1e40af; text-align: center;">StudyNotion Email Verification</h2>
    <p style="font-size: 16px; color: #111827;">Hello,</p>
    <p style="font-size: 16px; color: #374151;">
      Thank you for signing up with <strong>StudyNotion</strong>! To complete your registration, please verify your email using the OTP below:
    </p>
    <div style="text-align: center; margin: 24px 0;">
      <h1 style="font-size: 36px; color: #1e40af; letter-spacing: 4px;">${otp}</h1>
    </div>
    <p style="font-size: 15px; color: #374151;">This code will expire in <strong>5 minutes</strong>.</p>
    <p style="font-size: 15px; color: #374151;">If you didn’t request this, please ignore this email.</p>
    <hr style="margin: 24px 0; border: 0; border-top: 1px solid #e5e7eb;" />
    <p style="text-align: center; color: #9ca3af; font-size: 14px;">© ${new Date().getFullYear()} StudyNotion. All rights reserved.</p>
  </div>
`;
