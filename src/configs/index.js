require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  EMAIL: process.env.EMAIL,
  PASS_EMAIL: process.env.PASS_EMAIL,
  EMAIL_ADMIN: process.env.EMAIL_ADMIN,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
};
