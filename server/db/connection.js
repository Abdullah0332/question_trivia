const mongoose = require("mongoose");
const config = require("../config/index.js");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      config.MONGO_URI || process.env.MONGO_URI,
      {
        connectTimeoutMS: 20000,
        useNewUrlParser: true,
      },
      () => {
        console.log("Db Connected");
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;
