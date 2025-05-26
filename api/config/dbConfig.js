const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        if (process.env.NODE_ENV !== "test") {
            await mongoose.connect(process.env.MONGO_URI);
            console.log("Connected to MongoDB");
        }
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;