exports.passwordUpdated = (email, name) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>Password Update Confirmation</title>
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

			.warning {
				background-color: #ffe4e1;
				color: #d8000c;
				padding: 12px;
				border-radius: 6px;
				margin-top: 10px;
				font-size: 15px;
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

			<div class="message"> Password Updated Successfully</div>

			<div class="body">
				<p>Hey <span class="highlight">${name}</span>,</p>
				<p>Your password has been successfully updated for the account associated with <span class="highlight">${email}</span>.</p>
				<p>If you made this change, no further action is required.</p>

				<div class="warning">
					If you did <strong>not</strong> request this password change, please contact us immediately to secure your account.
				</div>
			</div>

			<div class="support">
				Need help? Reach out anytime at
				<a href="mailto:info@studynotion.com">info@studynotion.com</a>.
				<br>We’re always here to assist you!
			</div>
		</div>
	</body>
	
	</html>`;
};
