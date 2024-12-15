const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();

dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("CONECTADO A LA BD CORRECTAMENTE");
    } catch (err) {
        console.error("ERROR AL CONECTAR A LA BD", err);
    }
}

module.exports = connectDB;