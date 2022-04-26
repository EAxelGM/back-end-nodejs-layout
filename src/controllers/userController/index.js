import { response } from "../../helpers/responses";
import User from "../../models/User";
import Joi from "joi";
import optionsJoi from "../../helpers/validations";

const SchemaValidation = Joi.object({
  name: Joi.string(),
  lastname: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().allow(""),
});

const populateConfig = [];

export const showAll = async (req, res) => {
  try {
    const data = await User.find({}).populate(populateConfig);
    return response(res, { data });
  } catch (error) {
    console.log({ error });
    return response(res, { message: error.message, code: 500 });
  }
};

export const store = async (req, res) => {
  return response(res, {
    message: "No esta permitido crear usuarios en esta ruta",
    code: 500,
  });
};

export const show = async (req, res) => {
  try {
    const data = await User.findById(req.params.id).populate(populateConfig);
    return response(res, { data });
  } catch (error) {
    console.log({ error });
    return response(res, { message: error.message, code: 500 });
  }
};

export const update = async (req, res) => {
  try {
    const value = await SchemaValidation.validateAsync(req.body, optionsJoi);
    if (value.password) {
      value.password = await User.encryptPassword(value.password);
    } else {
      delete value.password;
    }

    const data = await User.findByIdAndUpdate(req.params.id, value, { new: true });

    return response(res, {
      message: "Datos actualizados!",
      data,
    });
  } catch (error) {
    console.log({ error });
    return response(res, {
      message: error.message,
      code: 403,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return response(res, {
        message: "No se encontro el usuario",
        code: 404,
      });
    }
    var message = "Usuario eliminado!";
    if (user.deleted) {
      await User.restore({ _id: req.params.id });
      message = "Usuario restaurado!";
    } else {
      await User.deleteById(req.params.id);
    }
    return response(res, {
      message,
      data: user,
    });
  } catch (error) {
    console.log({ error });
    return response(res, { message: error.message, code: 500 });
  }
};

export const changePassword = async (req, res) => {
  const value = req.body;
  const user = await User.findById(req.body.id);
  if (!user) {
    return response(res, {
      message: "Usuario no encontrado",
      code: 404,
    });
  }
  if (value.new_repeat_password != value.new_password) {
    return response(res, {
      message: "Las contraseñas no coinciden",
      code: 403,
    });
  }
  const isIgual = await User.comparePassword(value.old_password, user.password);
  if (!isIgual) {
    return response(res, {
      message: "La contraseña actual es incorrecta",
      code: 403,
    });
  }
  user.password = await User.encryptPassword(value.new_password);
  await user.save();
  return response(res, {
    message: "La contraseña se ha modificado con exito!",
    code: 200,
  });
};
