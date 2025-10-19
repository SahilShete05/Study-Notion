exports.otpTemplate = (otp) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body { font-family: Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 0; }
      .container { max-width: 480px; margin: 40px auto; background: #ffffff; padding: 20px 32px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
      h2 { color: #1e40af; }
      .otp-box { font-size: 28px; font-weight: bold; color: #111827; background: #f3f4f6; padding: 10px 20px; border-radius: 6px; display: inline-block; letter-spacing: 3px; }
      p { color: #374151; font-size: 16px; }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>StudyNotion Email Verification</h2>
      <p>Use the following One-Time Password (OTP) to verify your email:</p>
      <div class="otp-box">${otp}</div>
      <p>This OTP is valid for few minutes. Do not share it with anyone.</p>
      <p>Thanks,<br/>Team StudyNotion</p>
    </div>
  </body>
  </html>
`;
