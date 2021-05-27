const userModel = require("../model/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const jwtSKey = process.env.JWT_S_KEY;


exports.registerPost = async (req, res) => {

    let { email, pass } = req.body;

    pass = await bcrypt.hash(pass, 10);

    const newUser = new userModel({ email, pass });

    userModel.findOne({ email: req.body.email }, (err, doc) => {
        if (err) {
            console.log(err);
            res.send({ status: "failed", message: "err" });
        } else if (doc !== null) {
            // console.log(doc);
            res.status(406).send({
                status: "failed",
                message: "This email is already using",
            });
        } else {
            newUser.save((err, doc) => {
                if (err) {
                    console.log(err);
                    res.send({ status: "failed", message: "err" });
                } else {
                    // console.log(doc);
                    res.send({
                        status: "success",
                        message: "The account was created successfully",
                    });
                }
            });
        }
    })
};


exports.loginPost = (req, res) => {

    let { email, pass } = req.body

    userModel.findOne({ email }, async (err, doc) => {
        if (err) {
            console.log(err);

            res.send({ status: "failed", message: "err" });
        } else if (doc === null) {
            // console.log(doc);
            res.status(400).send({
                status: "failed",
                message: "Wrong credentials",
            });
        } else {
            // console.log(doc);

            const match = await bcrypt.compare(pass, doc.pass);
            if (match) {
                const token = jwt.sign({ id: doc._id }, jwtSKey, { expiresIn: "1d" });  // expiresIn - "expires time" after this period token will not valid
                res.send({
                    status: "success",
                    message: "User logged successufully",
                    token
                });
            } else {
                res.send({
                    status: "failed",
                    message: "Wrong password",
                });
            }
        }
    })
}