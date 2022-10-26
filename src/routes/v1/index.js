import express from "express";
import { response } from "../../helpers/responses";
import users from "./users.routes";
import auth from "./auth.routes";

import { verifyToken } from "../../middlewares";

//export default router
const app = express();

//List routes
app.get("/", (req, res) => {
  return response(res, { message: "Esta es la v1" });
});

app.use("/auth", auth);
app.use("/users", verifyToken, users);

export default app;
