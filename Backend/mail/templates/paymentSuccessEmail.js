exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
  return `<!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="UTF-8">
      <title>Payment Confirmation</title>
      <style>
          body {
              background-color: #ffffff;
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.6;
              color: #333333;
              margin: 0;
              padding: 0;
          }

          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              text-align: center;
          }

          .logo {
              max-width: 180px;
              margin-bottom: 20px;
          }

          .message {
              font-size: 20px;
              font-weight: bold;
              margin-bottom: 20px;
              color: #000000;
          }

          .body {
              font-size: 16px;
              margin-bottom: 20px;
              text-align: left;
          }

          .highlight {
              font-weight: bold;
              color: #1a73e8;
          }

          .payment-box {
              background-color: #f3f9ff;
              border: 1px solid #cce0ff;
              padding: 15px;
              border-radius: 8px;
              text-align: left;
              margin: 20px 0;
          }

          .cta {
              display: inline-block;
              padding: 12px 24px;
              background-color: #FFD60A;
              color: #000000;
              text-decoration: none;
              border-radius: 6px;
              font-size: 16px;
              font-weight: bold;
              margin-top: 20px;
              transition: background-color 0.2s ease-in-out;
          }

          .cta:hover {
              background-color: #ffcc00;
          }

          .support {
              font-size: 14px;
              color: #666;
              margin-top: 25px;
              text-align: center;
          }

          a {
              color: #1a73e8;
              text-decoration: none;
          }

          a:hover {
              text-decoration: underline;
          }
      </style>
  </head>
  
  <body>
      <div class="container">
          <a href="https://study-notion-frontend-weld-beta.vercel.app/">
              <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo">
          </a>

          <div class="message"> Payment Successful!</div>

          <div class="body">
              <p>Dear <span class="highlight">${name}</span>,</p>
              <p>We’re happy to confirm that your payment of <span class="highlight">₹${amount}</span> has been successfully received.</p>

              <div class="payment-box">
                  <p><strong>Payment Details:</strong></p>
                  <p> <strong>Amount:</strong> ₹${amount}</p>
                  <p> <strong>Payment ID:</strong> ${paymentId}</p>
                  <p> <strong>Order ID:</strong> ${orderId}</p>
              </div>

              <p>You can now access your enrolled course(s) in your dashboard.</p>

              <div style="text-align:center;">
                  <a class="cta" href="https://study-notion-frontend-weld-beta.vercel.app/dashboard">
                      Go to Dashboard
                  </a>
              </div>
          </div>

          <div class="support">
              If you have any questions or need assistance, please reach out to us at
              <a href="mailto:info@studynotion.com">info@studynotion.com</a>.  
              <br>We’re always here to help!
          </div>
      </div>
  </body>
  
  </html>`;
};
