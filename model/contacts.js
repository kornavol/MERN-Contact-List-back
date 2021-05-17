//Check Package.Json for mongoose. If it's not there, install via npm.
const mongoose = require("mongoose");

//const contacts is a constant and name van be different than collection.
const contacts = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    phone: {
      type: String,
      minLength: [5, "my custom error message"],
      maxLength: 15,
    },
    address: String,
  },
  { collection: "contactList" } // we need collection to use directly name which we wannt othervise we have to use names in plural test -> tests
);
//first contacts is the collection name, second one is our constant
module.exports = mongoose.model("contactList", contacts);
