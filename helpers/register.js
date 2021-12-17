const nodemailer = require('nodemailer');

function register(email) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rafiramdhani20@gmail',
      pass: 'com.gmail@20ramdhanirafi'
    }
  });

  let mailOptions = {
    from: 'rafiramdhani20@gmail',
    to: email,
    subject: 'WELCOME!',
    text: `Welcome to our app!`
  };

  return transporter.register(mailOptions, (err, info) => {
    if (err) throw err;
    console.log('Email sent: ' + info.response);
  });
}

module.exports = register