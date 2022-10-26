import dotenv from "dotenv";
dotenv.config();

const IS_PRODUCTION = process.env.IS_PRODUCTION == "true" ? true : false;

export default {
  PORT: process.env.PORT || 8000,
  SECRET: process.env.SECRET,

  MONGO_ATLAS: IS_PRODUCTION ? process.env.MONGO_ATLAS : process.env.DEV_MONGO_ATLAS,
  MONGO_HOST: IS_PRODUCTION ? process.env.MONGO_HOST : process.env.DEV_MONGO_HOST,
  MONGO_PORT: IS_PRODUCTION ? process.env.MONGO_PORT : process.env.DEV_MONGO_PORT,
  MONGO_USER: IS_PRODUCTION ? process.env.MONGO_USER : process.env.DEV_MONGO_USER,
  MONGO_PASSWORD: IS_PRODUCTION ? process.env.MONGO_PASSWORD : process.env.DEV_MONGO_PASSWORD,
  MONGO_DB_NAME: IS_PRODUCTION ? process.env.MONGO_DB_NAME : process.env.DEV_MONGO_DB_NAME,
};
