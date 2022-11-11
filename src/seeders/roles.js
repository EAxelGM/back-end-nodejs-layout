import Role from "../models/Role";
import Permissions from "../models/Permissions";

export const createRoleSuperAdmin = async () => {
  try {
    const name = "SuperAdmin";
    const role = await Role.findOne({ name });
    if (!role) {
      const permisos = await Permissions.find({});
      const rol = new Role({
        name,
        permissions: permisos.map((p) => p._id),
      });
      await rol.save();
      return console.log(`No existia rol ${name}, pero ya se ha creado.`);
    }

    return console.log(`Ya existe el rol ${name}`);
  } catch (error) {
    console.log(error);
    return error, message;
  }
};
