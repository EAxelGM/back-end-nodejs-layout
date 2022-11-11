import User from "../../models/User";
import jsw from "jsonwebtoken";
import config from "../../config";
import Joi from "joi";
import mongoose from "mongoose";
import { response } from "../../helpers/responses";
import optionsJoi from "../../helpers/validations";

const Schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  phone: Joi.string().allow(""),
  lastname: Joi.string().required(),
});

const SchemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const populateConfig = [{ path: "role", populate: [{ path: "permissions", select: ["name"] }] }];

export const signUp = async (req, res) => {
  try {
    const value = await Schema.validateAsync(req.body, optionsJoi);
    const newUser = new User({
      name: value.name,
      lastname: value.lastname,
      email: value.email,
      phone: value.phone,
      password: await User.encryptPassword(value.password),
    });

    await newUser.save();

    return response(res, {
      message: "Cuenta registrada con exito",
      data: newUser,
    });
  } catch (error) {
    console.log({ error });
    return response(res, { message: error.message, code: 500 });
  }
};

export const signIn = async (req, res) => {
  try {
    const value = await SchemaLogin.validateAsync(req.body, optionsJoi);
    const userFound = await User.findOne({ email: value.email }).populate(populateConfig);

    if (!userFound) {
      return res.status(400).json({
        message: "Error, credenciales no validas",
        info: "Usuario no encontrado",
      });
    }

    const matchPassword = await User.comparePassword(value.password, userFound.password);

    if (!matchPassword)
      return res.status(400).json({
        message: "Error, credenciales no validas",
        info: "Contraseña Incorrecta",
      });

    if (userFound.deleted) {
      return res.status(400).json({
        message: "Error, credenciales no validas",
        info: "Cuenta Eliminada",
      });
    }

    const token = jsw.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 60 * 60 * 24 * /* Dias -> */ 7,
    });

    return res.status(200).json({ token, user: userFound });
  } catch (error) {
    console.log({ error });
    return response(res, { message: error.message, code: 500 });
  }
};

export const getProfile = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.userId)) {
      return res.status(404).json({ message: "Error, no hay usuario con este ID" });
    }

    const user = await User.findById(req.userId, { password: 0 }).populate(populateConfig);

    return response(res, { data: user });
  } catch (error) {
    console.log({ error });
    return response(res, { data: error.message, code: 500 });
  }
};
