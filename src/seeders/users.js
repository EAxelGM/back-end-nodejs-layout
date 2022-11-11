import User from "../models/User";
import Role from "../models/Role";
import { faker } from "@faker-js/faker";

export const createAdmin = async () => {
  const email = "axel@example.com";
  const user = await User.find({ email }).findOne();
  if (!user) {
    const role = await Role.findOne({ name: "SuperAdmin" });

    const admin = new User({
      name: "Edgar Axel",
      lastname: "González Martinez",
      email,
      phone: "7229061556",
      password: await User.encryptPassword("123456789"),
      role: role._id,
    });
    await admin.save();
    return console.log("No habia administrador, pero ya se ha creado!");
  }
  return console.log("El admin ya existe");
};

export const usersFake = async ({ total = 100 }) => {
  const users = await User.countDocuments({});
  const role = await Role.findOne({ name: "SuperAdmin" });
  if (users < total) {
    console.log(`Creando los ${total} usuarios . . .`);
    for (let i = 1; i < total; i++) {
      await User.create({
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number("#########"),
        password: await User.encryptPassword("123456789"),
        role: role._id,
      });
    }
    console.log(`Se han creado los ${total} usuarios.`);
  }
};
