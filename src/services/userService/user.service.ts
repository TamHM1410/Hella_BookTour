import user from "../../models/UserModel";
import { instanceMongo } from "../../dbs/MongoDB/instanceMongo";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { upLoadFiles } from "../uploadFile/upload.service";
class UserService {
  private errorMessage = {
    status: "Internal server",
    statusCode: 501,
  };
  constructor() {
    this.errorMessage = {
      status: "Internal server",
      statusCode: 501,
    };
  }
  getAllUser = async (page: number, pageSize: number) => {
    try {
      await instanceMongo();
      const startIndex = (page - 1) * pageSize;
      const totalItems = await user.countDocuments();
      const data = await user.find();
      return data
        ? {
            status: "Success",
            statusCode: 201,
            data: data,
            page,
            pageSize,
            totalPages: Math.ceil(totalItems / pageSize),
            totalItems,
          }
        : this.errorMessage;
    } catch (error) {
      return this.errorMessage;
    }
  };
  getUserById = async (id: string) => {
    try {
      await instanceMongo();
      const data = await user.findById({
        _id: new mongoose.Types.ObjectId(id),
      });
      return data
        ? {
            status: "Success",
            statusCode: 201,
            data: data,
          }
        : this.errorMessage;
    } catch (error) {
      return this.errorMessage;
    }
  };
  deleteUserById = async (id: string) => {
    try {
      await instanceMongo();
      const data = await user.findByIdAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        { deleteAt: new Date(), status: false },
        { new: true }
      );
      return {
        status: "Success",
        statusCode: 201,
        data: data,
      };
    } catch (error) {
      return this.errorMessage;
    }
  };
  updateUser = async (currentData: {
    fullName: string;
    id: string;
    phone: string;
    gender: string;
    roleId: number;
    password: string;
    image:string
  },files :any[]) => {
    try {
      await instanceMongo();
      if(files.length==0){
        const data = await user.findByIdAndUpdate(
          { _id: new mongoose.Types.ObjectId(currentData.id) },
          {
            fullName: currentData.fullName,
            phone: currentData.phone,
            gender: currentData.gender,
            roleId: currentData.roleId,
            image:currentData.image
          },{
            new:true
          }
        );
        return data
          ? { status: "Success", statusCode: 201, data: data }
          : this.errorMessage;
       }
   
      const folderName =`Users/${currentData.id}`
      
      const  rs =await upLoadFiles(files,folderName)
      const data = await user.findByIdAndUpdate(
        { _id: new mongoose.Types.ObjectId(currentData.id) },
        {
          fullName: currentData.fullName,
          phone: currentData.phone,
          gender: currentData.gender,
          roleId: currentData.roleId,
          image:rs[0].thumb_url
        },{
          new:true
        }
      );
      return data
        ? { status: "Success", statusCode: 201, data: data }
        : this.errorMessage;
    } catch (error) {
      return this.errorMessage;
    }
  };
  updatePassword = async (
    currentData: {
      fullName: string;

      phone: string;
      gender: string;
      roleId: number;
      password: string;
      newPassword:string
    },
    id: string
  ) => {
    try {
      await instanceMongo();
      const hashPassword = await bcrypt.hash(currentData.newPassword, 10);
      const currentUser = await user.findById({
        _id: new mongoose.Types.ObjectId(id),
      });
      if (currentUser && currentUser.password) {
        
        const compare = await bcrypt.compare(
          currentData.password,
          currentUser.password
        );
        if (compare === true) {
          if(currentData.password===currentData.newPassword){
            return {
              status:'New password must be different with the old!',
              statusCode:409
            }
          }
          const data = await user.findByIdAndUpdate(
            { _id: new mongoose.Types.ObjectId(id) },
            { password: hashPassword },
            { new: true }
          );
          return data
            ? {
                status: "Success",
                statusCode: 201,
                data: data,
              }
            : this.errorMessage;
        } else {
          return {
            status: "Incorrect Password",
            statusCode: 401,
          };
        }
      }
    } catch (error) {
      return this.errorMessage;
    }
  };
}
export const userService = new UserService();
