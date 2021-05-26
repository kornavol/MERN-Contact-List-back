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
        minLenght: [8, 'Password must be at least 8 characters']
    }
});

module.exports = mongoose.model("users", users);
