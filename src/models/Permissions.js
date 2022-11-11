import mongoose from "mongoose";

const Schema = mongoose.Schema(
  {
    //? Este sera el nombre para validacion en el Front-End, este valor debe ser unico. Ejemplo: "user.create"
    name: {
      type: String,
      required: true,
      unique: true,
    },

    //? Este es para saber en que grupo pertenece. Ejemplo: "Users"
    group: {
      type: String,
      required: true,
      //default: "",
    },

    //? Breve explicacion de la accion que hace el Permiso. Ejemplo: "Permite Crear Usuarios"
    textFront: {
      type: String,
      required: true,
      //default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

const Model = mongoose.model("Permissions", Schema);

export default Model;
