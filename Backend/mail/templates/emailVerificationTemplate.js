exports.otpTemplate = (otp) => `
  <div style="font-family: Arial, sans-serif; padding: 16px;">
    <h2>StudyNotion Email Verification</h2>
    <p>Your One-Time Password (OTP) is:</p>
    <h1 style="color:#1e40af;">${otp}</h1>
    <p>This code will expire in 5 minutes.</p>
  </div>
`;
