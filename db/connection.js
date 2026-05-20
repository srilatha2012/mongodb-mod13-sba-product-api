//Import denpendency
const mongoose = require("mongoose");

//Load MONGO_URI to connect to the Mongo DB
const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
    try {
      await mongoose.connect(MONGO_URI)
      console.log("MongoDB connected Successfully");
    }catch(error){
        console.log("MongoDB connection error", error.message)
    }
}

module.exports = connectDB;