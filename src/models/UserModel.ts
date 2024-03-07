import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: false,

      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: false,
    },
    roleId: {
      type: Number,
      default: 0,
    },
    phone: {
      type: String,
      unique: true,
      default: ""
    },
    gender: {
      type: String,
      default: ""
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    deleteAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
const user = mongoose.model("User", userSchema);
export default user;
