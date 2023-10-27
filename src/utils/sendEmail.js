const nodemailer = require("nodemailer");
const configs = require("../configs/index");

const sendMail = async (email, subject, content) => {
  if (email && subject && content) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: configs.EMAIL,
        pass: configs.PASS_EMAIL,
      },
    });

    await transporter.sendMail({
      from: configs.EMAIL,
      to: email,
      subject: `${subject}`,
      html: `${content}`,
    });
  } else {
    console.log("Missing required parameter when sending email");
  }
};

module.exports = sendMail;
