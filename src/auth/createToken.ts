'use strict'
import * as jwt from 'jsonwebtoken'
interface tokenParams{
    payload:object,
    privateKey:string,
    refreshKey:string | undefined


}
export const createToken = async ({payload,privateKey,refreshKey} :tokenParams) =>{
   try{
    const accessToken = await jwt.sign(payload, privateKey, {
        algorithm: "RS256",
        expiresIn: "1day",
      });
      const refreshToken = await jwt.sign({refreshKey}, privateKey, {
        algorithm: "RS256",
       
        expiresIn: "7day",
      });
      return {
        accessToken,
        refreshToken,
      };
   }catch(error){
    console.log(error)
   }
}