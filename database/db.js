const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
};

module.exports = connectDB;

