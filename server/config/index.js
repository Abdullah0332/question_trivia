const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const config = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE_TIME: process.env.JWT_EXPIRE_TIME,
};

module.exports = config;
