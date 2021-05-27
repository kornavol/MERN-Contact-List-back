const mongoose = require("mongoose");

const users = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
    },
    pass: {
        type: String,
        required: true,
        minLenght: [5, 'Here we could write a custom eroor message'],
        maxLenght: 25
    }
});

module.exports = mongoose.model("users", users);
