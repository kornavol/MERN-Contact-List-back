const nodemailer = require('nodemailer')

const contacts = require('../model/contacts');


exports.about = (req, res) => {
    contacts.find({}, (err, docs) => {
        if (err) {
            res.render('about', { testData: `There's a problem. Please try again.` });
        } else {
            res.render('about', { testData: docs });
        }
    });
}

exports.getContact = async (req, res) => {
    // let transporter = nodemailer.createTransport(transport[, defaults])

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // for gmail
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.GMAIL_USER, // generated ethereal user
            pass: process.env.GMAIL_PASS, // generated ethereal password
        },
    });


    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Customer Service" <foo@example.com>', // sender address
        to: "volosh.andrey@gmail.com, ", // list of receivers
        subject: "Tivket from: " + req.body.fullName, // Subject line
        text: req.body.message, // plain text body
        html: `<b>${req.body.message}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    console.log(req.body);
    /* We also could send json as respond */
    res.json({ status: "success", message: "Gongrats" });
}