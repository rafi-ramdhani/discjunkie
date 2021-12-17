const nodemailer = require('nodemailer');

function sendMail(email) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'disk.junkye@gmail.com',
      pass: 'diskdiskdisk'
    }
  });

  var mailOptions = {
    from: 'disk.junkye@gmail.com',
    to: `${email}`,
    subject: 'Thank You!',
    text: `Thank you ${User.name} for picking DiskJunkie Store. We will secure your package so no one will disturb trying
       to take away your movie pick(s), see you in our store!`
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Email has been sent');
    }
  });
}

module.exports = sendMail