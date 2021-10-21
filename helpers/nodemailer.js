const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'todoinBlog@gmail.com',
    pass: 'vinaekal'
  }
})

function sendEmail (payload, content, subject) {
    const mailOptions = {
        from: 'todoinBlog@gmail.com',
        to: payload.email,
        subject: `${subject}`,
        text: `
        ${subject} - ${payload.name}
        ________________________________

        ${content}

        `
    }
      
    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
          console.log(err)
        } else {
          console.log(`email berhasil dikirim + ${info.response}`)
        }
    })
}

module.exports = sendEmail