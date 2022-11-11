import mongoose from "mongoose";

const Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permissions" }],
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

const Model = mongoose.model("Role", Schema);

export default Model;
