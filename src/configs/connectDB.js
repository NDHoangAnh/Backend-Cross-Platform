const mongoose = require("mongoose");
const configs = require("./index");

const connectDB = async () => {
  try {
    await mongoose.connect(configs.MONGO_URL);
    console.log("Connect Mongo successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
