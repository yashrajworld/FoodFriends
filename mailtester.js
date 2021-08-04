const nodemailer = require('nodemailer');
async function main() {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yashrajkesarwani2000@gmail.com',
            pass: 'Chandankichampi@911'
        }
    })
    const mailOptions = {
        from: 'yashrajkesarwani2000@gmail.com',
        to: 'balajikesarwani14@gmail.com',
        subject: 'This is mail for testing',
        html: '<h1>Hello and welcome to testing mail</h1><hr><p>This is test mail</p>'
    }
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err)
        }
        else {
            console.log(info)
        }
    })
}
main()