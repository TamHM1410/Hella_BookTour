
import user from "../../models/UserModel"
import  bcrypt from 'bcryptjs'
import { instanceMongo } from "../../dbs/MongoDB/instanceMongo"
import crypto from "crypto";
import { createToken } from "../../auth/createToken";
import keyService from "../keyService/keyService";


interface Data {
    email: string,
    fullName: string,
    password:string
    phone: string,
    gender: string
}

class AccessService {
    signUp= async ({fullName, email,password,  phone, gender}: Data) => {
        instanceMongo()
      try{
       
        const checkExistMail = await user.findOne({email:email})
        const checkExistPhone = await user.findOne({phone:phone})
        
        if(checkExistMail) return { status :'Error',message :'Existing email' }
        if(checkExistPhone) return {status :'Error', message :'Existing phone' }

        
        const hassPassword= await bcrypt.hash(password,10)
        const newUser= new user({
            fullName:fullName,
            email:email,
            password:hassPassword,
            phone:phone,
            gender:gender

        })
     
      await newUser.save()
    
      return {
        status :'Success',
        message:'Sign up successs'
      }

      }catch(error){
        console.log('error',error)
        return {
          status :'Error',
          message:'Sign up fail'
        }
      }
        
    }
    signIn=async ({email,password}:Data)=>{
      instanceMongo()
      try{
        const checkUser=await user.findOne({email:email})
        if(!checkUser){
          return  {
            status :"Error",
            message:"Incorrect email"
          }
        }else{
         const checkPass= await bcrypt.compare(password,checkUser.password)
      
          if(checkPass===false){
            return {
              status :"Error",
              message:"Incorrect password"
            }
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
            crypto.generateKey('hmac', { length: 512 }, (err, key) => {
                if (err) reject(err);
                const cloneKey: string = key.export().toString('hex');
                resolve(cloneKey);
            });
        });
          const payload :object ={
            id: checkUser._id,
            fullName:checkUser.fullName,
            phone:checkUser.phone,
            roleId:checkUser.roleId,
            email:checkUser.email

          }
        
          await keyService.createKeyToken({userId :checkUser._id,publicKey,refreshKey})
          const token =await createToken({payload,privateKey,refreshKey})
          return {
            message :"login success",
            token,
            id: checkUser._id
          }
  

        }
     
      }catch(error){
        console.log(error)
      }

    }

}
 export const accesssService =new AccessService()