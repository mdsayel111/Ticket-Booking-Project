const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_PASS,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
    },
});

export const sendMail = async (messageBody: {
    from: String,
    to: String,
    subject: String,
    text: String, // plain text body
    html: String, // html body
}) => {
    const info = await transporter.sendMail(messageBody);
    console.log(info.messageId)
}