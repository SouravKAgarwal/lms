import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASS,
  },
});

export const sendVerificationEmail = async (user, options) => {
  const { name, email } = user;
  const { subject, activationCode } = options;

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html: `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Activation Mail</title>
          <style type="text/css">
            body {
              margin: 0;
              padding: 0;
              min-width: 100%;
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.5;
              background-color: #fafafa;
              color: #222222;
            }
            a {
              text-decoration: none;
              color: #000;
            }
            h1 {
              font-size: 24px;
              font-weight: 700;
              line-height: 1.25;
              margin-top: 0;
              margin-bottom: 15px;
              text-align: center;
            }
            p {
              margin-top: 0;
              margin-bottom: 15px;
            }
            table td {
              vertical-align: top;
            }
            .email-wrapper {
              max-width: 600px;
              margin: 0 auto;
            }
            .email-header {
              background-color: #0070f3;
              padding: 24px;
              color: #ffffff;
            }
            .email-body {
              padding: 24px;
              background-color: #ffffff;
            }
            .email-footer {
              background-color: #f6f6f6;
              padding: 24px;
            }
            .button {
              display: inline-block;
              background-color: #0070f3;
              color: #ffffff;
              font-size: 16px;
              font-weight: 700;
              text-align: center;
              text-decoration: none;
              padding: 12px 24px;
              border-radius: 4px;
            }
          </style>
        </head>
        <body>
          <div class="email-wrapper">
            <div class="email-header"><h1>Welcome to E-Learning</h1></div>
            <div class="email-body">
              <p>Hello ${name},</p>
              <p>
                Thank you for registering with us. To activate your account, please
                use the following activation code :
              </p>
              <h2>${activationCode}</h2>
              <p>Please enter this code within the next 5 minutes</p>
              <p>If you didn't register for a E-Learning account, please ignore this mail.</p>
            </div>
            <div class="email-footer">
              <p>
                If you have any questions, please don't hesitate to contact us at
                <a href="mailto:support@lms.com">support@lms.com</a>
              </p>
            </div>
          </div>
        </body>
    </html>
`,
  };
  await transporter.sendMail(mailOptions);
};

export const sendReplyNotificationMail = async (data) => {
  const { name, email, title, subject } = data;

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html: `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Reply Notification Mail</title>
        </head>
        <body>
          <h1>Hello ${name},</h1>
          <p>A new reply has been added to your question in the video ${title}</p>
          <p>Please login in to the website to view the reply and continue the discussion.</p>
          <p>Thank your for being part of the community.</p>
        </body>
      </html>`,
  };

  await transporter.sendMail(mailOptions);
};

export const sendOrderConfirmation = async (mailData) => {
  const order = mailData.order;
  const { email, subject } = mailData.options;

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Ubuntu+Sans:ital,wght@0,100..800;1,100..800&display=swap"
      rel="stylesheet"
    />
    <title>Order Confirmation Mail</title>
    <style>
      body {
        font-family: "Poppins", sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        height: 100vh;
        margin: 0 auto;
        padding: 20px;
        background-color: #4f5ef1;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        color: #ffffff;
      }
      .message {
        text-align: center;
        font-size: 18px;
        margin-bottom: 20px;
        padding-top: 50px;
      }
      .message-sm {
        text-align: center;
        font-size: 18px;
        margin-bottom: 20px;
        padding-top: 50px;
      }
      .message-sm > h1 {
        text-align: center;
        font-size: 25px;
        font-weight: 600;
      }
      .course-info {
        margin: auto;
        padding: 20px 0px;
        width: 100%;
        background-color: #fff;
        border-radius: 10px;
        margin-bottom: 20px;
        box-shadow: 2px 2px 2px 2px rgba(206, 197, 197, 0.1);
        color: #000;
      }
      .course-info > h4 {
        color: #23bd70;
        font-size: 22px;
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        text-align: center;
        padding: 0 !important;
        margin-top: 0 !important;
      }
      .course-name {
        font-size: 24px;
        margin-bottom: 10px;
      }
      .purchase-info {
        font-size: 16px;
      }
      .total {
        font-size: 18px;
        text-align: right;
        margin-top: 20px;
      }
      footer {
        text-align: center;
        margin-top: 100px;
        color: #fff;
      }
      .footer > p > a {
        text-decoration: none;
        display: inline-block;
        color: #fff;
      }
      .flex {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #9999993f;
      }
      .flex h4 {
        font-weight: 400;
        margin-bottom: 5px;
      }
      .flex.lg {
        width: 85%;
        margin: auto;
        border-bottom: none;
      }
      .first-td {
        text-transform: uppercase;
        color: #0000006c;
        font-size: 16px;
        padding: 5px 0px;
        width: 1%;
      }
      .first-td {
        font-weight: 600 !important;
      }
      .second-td {
        font-weight: 500 !important;
        color: #000000af;
        font-size: 15px;
      }
      .title {
        font-size: 16px !important;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      td {
        padding: 10px;
        text-align: center;
        width: 28.33%;
      }
      td.col-2 {
        width: 100%;
        text-align: left;
        padding: 0px;
        margin: 0;
      }
      .m-auto {
        width: 100%;
        margin: auto;
      }
      .table-row {
        width: 70%;
        display: block;
        margin: auto;
        padding: 10px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="message-sm">
        <h1>Your ELearning order is confirmed!</h1>
        <p>And we're just as excited as you are.</p>
      </div>
      <br />
      <br />
      <div class="course-info">
        <h4>Here's what you ordered:</h4>
        <table style="border-bottom: 1px solid #0000002f">
          <tr>
            <td>Order #: ${order._id}</td>
            <td>Order Date: ${order.date}</td>
          </tr>
        </table>
        <table style="width: 90%; margin: auto; padding-top:20px; display: block">
          <tr>
            <td class="first-td">Item</td>
            <td class="first-td">Qty</td>
            <td class="first-td">cost</td>
          </tr>
        </table>
        <table style="width: 90%; margin: auto; display: block">
          <tr>
            <td class="second-td">${order.name}</td>
            <td class="second-td">1</td>
            <td class="second-td">$${order.price}</td>
          </tr>
        </table>
        <table class="table-row" style="border-top: 1px solid #00000029">
          <tr>
            <td class="col-2">Subtotal:</td>
            <td class="col-2">$${order.price}</td>
          </tr>
        </table>
        <table class="table-row" style="margin-top: -20px">
          <tr>
            <td class="col-2">Total:</td>
            <td class="col-2">$${order.price}</td>
          </tr>
        </table>
      </div>
      <div class="footer">
        <p>
          If you have any questions, please contact our support team at
          <a href="mailto:support@lms.com">support@lms.com</a>
        </p>
        <p>&copy; 2023 Elearning. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`,
  };

  await transporter.sendMail(mailOptions);
};
