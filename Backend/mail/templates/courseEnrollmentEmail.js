exports.courseEnrollmentEmail = (courseName, name) => {
  return `<!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="UTF-8">
      <title>Course Enrollment Confirmation</title>
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
              color: #000;
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

          .cta {
              display: inline-block;
              padding: 12px 24px;
              background-color: #FFD60A;
              color: #000;
              text-decoration: none;
              border-radius: 5px;
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

          <div class="message"> Course Enrollment Successful!</div>

          <div class="body">
              <p>Dear <span class="highlight">${name}</span>,</p>
              <p>Congratulations! You’ve successfully enrolled in the course <span class="highlight">"${courseName}"</span>.</p>
              <p>We’re thrilled to have you on board and can’t wait for you to start learning. Your course materials are now available in your dashboard.</p>
              
              <div style="text-align:center;">
                  <a class="cta" href="https://study-notion-frontend-weld-beta.vercel.app/dashboard">
                      Go to Dashboard
                  </a>
              </div>
          </div>

          <div class="support">
              If you have any questions or need assistance, please reach out to us at 
              <a href="mailto:info@studynotion.com">info@studynotion.com</a>.  
              <br>We’re always happy to help!
          </div>
      </div>
  </body>
  
  </html>`;
};
