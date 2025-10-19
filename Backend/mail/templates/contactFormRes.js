exports.contactUsEmail = (
  email,
  firstname,
  lastname,
  message,
  phoneNo,
  countrycode
) => {
  return `<!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="UTF-8">
      <title>Contact Form Confirmation</title>
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

          .support {
              font-size: 14px;
              color: #666;
              margin-top: 20px;
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
          <div class="message">Contact Form Confirmation</div>
          <div class="body">
              <p>Dear <span class="highlight">${firstname} ${lastname}</span>,</p>
              <p>Thank you for contacting us! We have received your message and will respond to you as soon as possible.</p>
              
              <p><b>Here are the details you provided:</b></p>
              <p> <b>Email:</b> ${email}</p>
              <p> <b>Phone Number:</b> +${countrycode} ${phoneNo}</p>
              <p> <b>Message:</b> ${message}</p>

              <p>We appreciate your interest and will get back to you shortly.</p>
          </div>
          <div class="support">
              If you have any further questions or need immediate assistance, please feel free to reach out to us at 
              <a href="mailto:info@studynotion.com">info@studynotion.com</a>.  
              <br>We are here to help!
          </div>
      </div>
  </body>
  
  </html>`;
};
