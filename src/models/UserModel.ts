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
    image:{
      type:String,
      default:"https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"
    },
    verified:{
      type:Boolean,
      default:false,
     
    }
  },

  {
    timestamps: true,
  }
);

//Export the model
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
