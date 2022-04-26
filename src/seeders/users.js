import User from "../models/User";

export const createAdmin = async () => {
  const user = await User.find({ email: "axel@excite.com.mx" }).findOne();
  if (!user) {
    const admin = new User({
      name: "Axel",
      lastname: "Gonzalez",
      email: "axel@excite.com.mx",
      password: await User.encryptPassword("exc*3006"),
    });
    await admin.save();
    return console.log("No habia administrador, pero ya se ha creado!");
  }
  return console.log("El admin ya existe");
};
