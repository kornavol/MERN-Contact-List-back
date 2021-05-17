const mongoose = require("mongoose");

const logs = new mongoose.Schema({
  dataTime: {
    type: Date,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  preData: {
    type: String,
  },
  postData: {
    type: String,
  },
});
module.exports = mongoose.model("logs", logs);
