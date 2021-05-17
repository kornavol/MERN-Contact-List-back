//Check Package.Json for mongoose. If it's not there, install via npm.
const mongoose = require('mongoose');

//Check DB name!

const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

//No needing to check something
const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
        });
        console.log('Mongo is ready!');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;
//Don't forget to require from app.js and call function there.