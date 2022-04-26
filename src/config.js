import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 8000,
  SECRET: process.env.SECRET,

  MONGO_ATLAS: process.env.MONGO_ATLAS,
  MONGO_HOST: process.env.MONGO_HOST,
  MONGO_PORT: process.env.MONGO_PORT,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
};
