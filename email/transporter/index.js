const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
  service: 'gmail',
  /* logger: true,
  debug: true, */
  secureConnection: false,
  auth: {
    user: 'result.deliver911@gmail.com',
    pass: 'Mayee007'
      },
  tls: {
      rejectUnauthorized: false
    },
});

module.exports = transporter


