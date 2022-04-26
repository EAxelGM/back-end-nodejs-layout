import jwt from "jsonwebtoken";
import config from "../config.js";
import User from "../models/User.js";
import { response } from "../helpers/responses.js";

export const verifyToken = async (req, res, next) => {
  try {
    var token = req.headers.authorization.split(" ")[1];

    if (!token)
      return response(res, { message: "Token Invalido - No hay", code: 403 });

    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });

    if (!user)
      return response(res, { message: "Token Invalido - Not user", code: 403 });

    next();
  } catch (err) {
    return response(res, { message: "Token Invalido", code: 403 });
  }
};
