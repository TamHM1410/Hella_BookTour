import user from "../../models/UserModel";
import bcrypt from "bcryptjs";
import { instanceMongo } from "../../dbs/MongoDB/instanceMongo";
import crypto from "crypto";
import { createToken } from "../../auth/createToken";
import keyService from "../keyService/keyService";
import keys from "../../models/KeyModel";
import mongoose from "mongoose";
import OtpShcema from "../../models/OTP.model";
import otpGenerator from 'otp-generator'

interface Data {
  email: string;
  fullName: string;
  password: string;
  phone: string;
  gender: string;
}

class AccessService {
  signUp = async ({ fullName, email, password, phone, gender }: Data) => {
    instanceMongo();
    try {
      const checkExistMail = await user.findOne({ email: email });
      const checkExistPhone = await user.findOne({ phone: phone });

      if (checkExistMail)
        return { statusCode: 409 , status: "Error", message: "Existing email" };
      if (checkExistPhone)
        return { statusCode: 409, status: "Error", message: "Existing phone" };

      const hassPassword = await bcrypt.hash(password, 10);
      const newUser = new user({
        fullName: fullName,
        email: email,
        password: hassPassword,
        phone: phone,
        gender: gender,
      });

      await newUser.save();

      return {
        status: "Sign up successs!",
     
        statusCode:201
      };
    } catch (error) {
      console.log("error", error);
      return {
        statusCode: 500,
        status: "Error",
        message: "Sign up fail",
      };
    }
  };
  signIn = async ({ email, password }: Data) => {
    instanceMongo();
    try {
      const checkUser = await user.findOne({ email: email });
      if (!checkUser || !checkUser.password) {
        return {
          statusCode: 409,
          status: "Error",
          message: "Incorrect email",
        };
      } else {
        const checkPass = await bcrypt.compare(password, checkUser.password);

        if (checkPass === false) {
          return {
            statusCode: 409,
            status: "Error",
            message: "Incorrect password",
          };
        }
        const { privateKey, publicKey } = await crypto.generateKeyPairSync(
          "rsa",
          {
            modulusLength: 4096,
            publicKeyEncoding: {
              type: "pkcs1",
              format: "pem",
            },
            privateKeyEncoding: {
              type: "pkcs1",
              format: "pem",
            },
          }
        );

        const refreshKey = await new Promise<string>((resolve, reject) => {
          crypto.generateKey("hmac", { length: 512 }, (err, key) => {
            if (err) reject(err);
            const cloneKey: string = key.export().toString("hex");
            resolve(cloneKey);
          });
        });
        const payload: object = {
          id: checkUser._id,
          fullName: checkUser.fullName,
          phone: checkUser.phone,
          roleId: checkUser.roleId,
          email: checkUser.email,
        };

        await keyService.createKeyToken({
          userId: checkUser._id,
          publicKey,
          refreshKey,
        });
        const token = await createToken({ payload, privateKey, refreshKey });

        return {
          statusCode: 200,
          status: "Login success",
          token,
          userData: {
            id: checkUser._id,
            role: checkUser.roleId,
          },
        };
      }
    } catch (error) {
      console.log(error);
    }
  };
  logOut = async (userId: string | undefined) => {
    try {
      await instanceMongo()
      await keys.findOneAndDelete({
        userId: new mongoose.Types.ObjectId(userId),
      });
      return {
        status: "Log Out Success",
        statusCode: 200,
      };
    } catch (error) {
      return {
        status: "Internal Server!",
        statusCode: 500,
      };
    }
  };
  verifyEmail =async(email:string)=>{
    try{
       await instanceMongo()
       const dataByEmail = await user.findOne({ email: email });

       if (!dataByEmail) {
           return {
               status: 'Not correct Email',
               statusCode: 409
           };
       }
       
       const otp = otpGenerator.generate(6, { digits: true, specialChars: false });
       const createNewOtp = await OtpShcema.create({
           userId: dataByEmail._id, 
           otp_code: otp
       });
       return {status: 'Success',
       statusCode: 201,
       data:createNewOtp
          
       }
       

    }catch(error){
      console.log(error)
      return {
        status: "Internal Server!",
        statusCode: 500,
        e:error
      };
    }
  }
}
export const accesssService = new AccessService();
