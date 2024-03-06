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
    },
    gender: {
      type: String,
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
    image:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);

//Export the model
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
