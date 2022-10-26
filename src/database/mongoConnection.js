import mongoose from "mongoose";
import config from "../config";

const MONGO_ATLAS = config.MONGO_ATLAS == "true" ? true : false;
const MONGO_HOST = config.MONGO_HOST;
const MONGO_PORT = config.MONGO_PORT;
const MONGO_USER = config.MONGO_USER;
const MONGO_PASSWORD = config.MONGO_PASSWORD;
const MONGO_DB_NAME = config.MONGO_DB_NAME;

let URL = "";

if (!MONGO_ATLAS) {
  if (MONGO_PASSWORD == "" || MONGO_USER == "") {
    URL = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}?readPreference=primary&appname=MongoDB%20Compass&ssl=false`;
  } else {
    URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=admin`;
  }
} else {
  URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB_NAME}?retryWrites=true&w=majority`;
}

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex:true
  })
  .then((res) => console.log(`Conexion con mongo al host: ${MONGO_HOST} & Base de Datos: ${MONGO_DB_NAME}`))
  .catch((err) => {
    console.log(`Hubo un error en la conexion con mongo:`);
    console.log({ err });
  });
