import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";
import bcrypt from "bcryptjs";

const Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: "" },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

Schema.plugin(mongooseDelete, { deletedAt: true });

Schema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

Schema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

Schema.virtual("fullname").get(function () {
  return `${this.name} ${this.lastname}`;
});

/* Schema.virtual("carrito", {
  ref: "Carrito",
  localField: "_id",
  foreignField: "user",
  justOne: true,
}); */

export default mongoose.model("User", Schema);
