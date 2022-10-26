//? Aqui se deberan ir agregando más informacion con respecto a las validaciones de Joi.

const spanish = {
  "string.email": "{#label} debe ser un Correo Eléctronico valido",
  "any.required": "{#label} debe ser requerido",
};

const options = {
  errors: {
    language: "spanish",
  },
  messages: {
    spanish,
    empty: {},
  },
};

export default options;
