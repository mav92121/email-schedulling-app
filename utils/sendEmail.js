import nodemailer from "nodemailer";
import "dotenv/config";

const sendEmail = ({ recipeintEmail, subject, text }) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mohsinali530121@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: "mohsinali530121@gmail.com",
    to: recipeintEmail,
    subject,
    text,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export default sendEmail;
