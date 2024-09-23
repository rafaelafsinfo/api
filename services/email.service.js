const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // ou true para porta 465
      auth: {
        user: process.env.email,
        pass: process.env.senhaemail
      }
    });
  }

  async sendEmail(from, to, subject, text) {
    try {
      const mailOptions = {
        from,
        to,
        subject,
        text
      };

      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

module.exports = EmailService;