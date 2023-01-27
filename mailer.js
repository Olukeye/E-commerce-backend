// const nodemailer = require('nodemailer')


// exports.sendConfirmationEmail = ({toUser, emailToken}) => {
//     return new Promise((req, rej) => {
//    // create reusable transporter object using the default SMTP transport
//     var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.GOOGLE_USER,
//         pass: process.env.GOOGLE_PASS
//     },
//     tls: {
//         Ciphers: 'SSLv3'
//     }
//    });

//  // send verification mail
//  const mailOptions = {
//     from:` "verify your mail ✔" <olukeye1987@gmail.com>`,
//     to: toUser.email,
//     subject: 'Quickducks -verify your email ✔',
//     html:`<h3>${newUser.username}! Thnaks for signing up on our page</h3>
//           <h5>Please verify the mail sent to continue......</5>
//           <a href="http://${process.env.DOMAIN}/user/verify-email?token=${emailToken}">verify your email please</a>`
//   }
//   // sending mail
//   transporter.sendMail(mailOptions, function(err, info){
//     if(err) {
//       console.log(error)
//     } else {
//       console.log('verification mail sent to your mail account: ' + info)
//     }
//   });
//   })
// }


// // DOMAIN=http://localhost:2020