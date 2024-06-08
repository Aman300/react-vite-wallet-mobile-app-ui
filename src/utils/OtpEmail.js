const nodemailer = require("nodemailer")

/*------------------- Start's Send OTP On Email -------------------------*/

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: "thinkinternet2020@gmail.com",
    pass: "frtlgbyfkoimmmup",
  },
})

exports.sendEmail = async (email, subject, text) => {
  try {
    await transporter.sendMail({
      from: "thinkinternet2020@gmail.com",

      to: email,

      subject: subject,

      html: `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Verify Your Account</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 50px;
                        background-color: #f5f5f5;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        border-radius: 10px;
                        border: 1px solid gray;
                        background-color: #fff;
                    }
                    h1, h2 {
                        margin: 0;
                        padding: 10px;
                    }
                    h1 {
                        text-align: center;
                        font-size: 24px;
                        font-weight: bold;
                    }
                    h2 {
                        text-align: center;
                        font-size: 36px;
                        font-weight: bold;
                        color: green;
                    }
                    p {
                        margin: 0;
                        padding: 10px;
                        text-align: center;
                        font-size: 16px;
                    }
                    img {
                        display: block;
                        margin: auto;
                        max-width: 50px;
                    }
                    .code {
                        margin: 20px auto;
                        line-height: 150px;
                        text-align: center;
                        font-size: 60px;
                        font-weight: bold;
                        color: green;

                    }
                    .disclaimer {
                        margin-top: 20px;
                        font-size: 14px;
                        color: #999;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Verify Your Account</h1>
                    <p>A sign-in attempt requires further verification because we did not recognize your device. To complete the sign-in, enter the verification code on the unrecognized device.</p>
                    
                    <h2 class="code">${text}</h2>
                    <p>The verification code above will expire in 30 minutes. If you did not initiate this request, please ignore this email.</p>
                    <p class="disclaimer">This is an automated email. Please do not reply to this email.</p>
                </div>
            </body>
            </html>
            `,
      text: text,
    })

    console.log("Email sent sucessfully")
  } catch (error) {
    console.log("Email not sent")

    console.log(error)
  }
}
