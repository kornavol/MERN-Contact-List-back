const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");

const contacts = require("../model/contacts");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "attachments/");
  },
  filename: function (req, file, cb) {
    cb(null, "f" + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).array("attachs", 10);

exports.about = (req, res) => {
  contacts.find({}, (err, docs) => {
    if (err) {
      res.render("about", { testData: `There's a problem. Please try again.` });
    } else {
      res.render("about", { testData: docs });
    }
  });
};

exports.getContact = (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      console.log(err);
    }

    // create reusable transporter object using the default SMTP transport
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // for gmail
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
        to: "sinicin.andrii@gmail.com, ", // list of receivers
        subject: "Tivket from: " + req.body.fullName, // Subject line
        text: req.body.message, // plain text body
        html: `<b>${req.body.message}</b>`, // html body
        attachments: req.files
          ? req.files.map((file) => {
              return { path: file.path };
            })
          : [],
      });

      console.log("Message sent: %s", info.messageId);
      console.log(req.body);

      /* In this case respond is sendend in JSON  format */
      res.json({ status: "success", message: "Gongrats" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: "failed", message: err });
    }
  });
};
