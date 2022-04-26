import express from "express";
import morgan from "morgan";
import cors from "cors";
import routesV1 from "./routes/v1";
import { response } from "./helpers/responses";
import { createAdmin } from "./seeders/users";

const app = express();

//Middelwares
app.use(cors());
//use morgan for dev
app.use(morgan("dev"));
//body json parser
app.use(express.json());

//! Seeders
createAdmin();

//Routes
app.get("/", (req, res) => {
  return response(res, {
    message: "WhatsApp Services API",
  });
});

//Routes api V1
app.use("/api/v1", routesV1);

app.get("*", (req, res) => {
  return response(res, {
    message: "Ruta no definida",
    code: 404,
  });
});

export default app;
