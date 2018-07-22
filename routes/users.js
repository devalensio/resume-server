var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config()

/* GET users listing. */
router.post('/sendMail', (req, res) => {
  console.log(req.body);
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
      <h3>Contact Detail</h3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `

    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "devalensio@gmail.com",
            pass: `${process.env.ACCESSSECRET}`
        }
    })

    let mailOptions = {
        from: `${req.body.email}`,
        to: 'devalensio@gmail.com',
        subject: 'Hello ✔',
        text: `${req.body.message}`,
        html: htmlEmail
    }

    smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).json({
          message: 'Message sent'
        })
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    })
  })
});

module.exports = router;
