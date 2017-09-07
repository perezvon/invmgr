const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const mailService = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASS
    }
});

module.exports = mailService;
