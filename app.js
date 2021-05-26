require("dotenv").config(); // better if wiil be in top on file

const express = require("express");
const app = express();



const connectDB = require("./config/db");

const contacts = require("./router/contacts");
const auth = require("./router/auth")
const authMid = require('./middleware/auth')

const port = process.env.PORT || 8080;

connectDB();

app.use(express.json());

let allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
};

app.use(allowCrossDomain);

app.use("/contacts", authMid.checkAuth,  contacts);
app.use("/auth", auth)

app.listen(port, () => console.log(`Server started to run on ${port}`));
