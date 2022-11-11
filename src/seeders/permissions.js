import Permission from "../models/Permissions";

export const createPermissions = async () => {
  try {
    const permissions = await Permission.find({});
    const permissions_totales = [
      // Users
      { group: "Users", name: "users.create", textFront: "Permite Crear Usuarios" },
      { group: "Users", name: "users.update", textFront: "Permite Editar Usuarios" },
      { group: "Users", name: "users.showAll", textFront: "Permite Ver Todos los Usuarios" },
      { group: "Users", name: "users.show", textFront: "Permite Ver Información de un Usuario" },
      { group: "Users", name: "users.delete", textFront: "Permite Eliminar Usuarios" },

      //? Escribe los demas Permisos necesarios aca abajo 👇 y cada vez que se guarde este archivo, se iran creando sin necesidad de ejecutar un comando en especial

      //...
    ];

    if (permissions.length < permissions_totales.length) {
      console.log(`Faltan permisos por crear. Creando . . .`);
      let permiso;
      let count = 0;

      await permissions_totales.forEach(async (per, index) => {
        if (!permissions.map((p) => p.name).includes(per.name)) {
          permiso = new Permission(per);
          permiso.save();
          count++;
        }

        //? Este codigo 👇, lo que hace es que hace un update de cada uno, en dado caso de hayan cambiado de descripcion, los modifica, sin necesidad de ir a Base de Datos en este caso, lo dejo aqui por se se llegase a ocupar

        /* else {
          console.log(`Rol modificado: ${per.name}`);
          const permi = await Permission.findOneAndUpdate({ name: per.name }, per);
        } */
      });

      console.log(`Se han creado los ${count} nuevos permisos. En total ${permissions_totales.length}`);
    } else {
      console.log(`Los ${permissions_totales.length} permisos ya existen :D.`);
    }

    return "";
  } catch (error) {
    console.log(error);
    return error, message;
  }
};
