'use strict'
import crypto from 'crypto' 
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
// import keyService from '../services/keyService/keyService'
import { Request,Response,NextFunction } from 'express'
import { instanceMongo } from '../dbs/MongoDB/instanceMongo'

import keys from '../models/KeyModel'

export const checkLogin =async (req:Request,res:Response,next:NextFunction)=>{
    try{
        await instanceMongo()
        
        const header= req.headers.authorization
        const data =req.headers?.id
        const id =data?.toString()
       
        console.log('id',id)
       
        if(header){
          const token =header.split(' ')[1];
          const tokenParts = token.split(':');
          const accessToken = tokenParts[0];
          const refreshToken = tokenParts[1];
          if(id){
            const currentUserkey = await keys.findOne({userId:new mongoose.Types.ObjectId(id)})
            console.log('current',currentUserkey)
            const userPublickey = currentUserkey?.publicKey
            if(userPublickey){
                const publicKey= await crypto.createPublicKey({
                    key: currentUserkey?.publicKey,
                    format: 'pem',
                  });
                try {
                    const decodedToken = await jwt.verify(accessToken, publicKey);
                    const currentTime = await Math.floor(Date.now() / 1000); // Current time in Unix timestamp (seconds)
                    if (typeof decodedToken === 'object' && 'exp' in decodedToken) {
                      const decodedTokenTyped = decodedToken as {
                            id: string,
                            fullName: string,
                            roleId: number,
                            email: string,
                            iat: number,
                            exp: number
                        };
                        if(decodedTokenTyped.exp>currentTime){
                            next()
                        }else {
                            const decodedRefesh =await jwt.verify(refreshToken,publicKey)
                            if (typeof decodedRefesh === 'object' && 'exp' in decodedRefesh) {
                                
                                const decodedRefeshTyped = decodedRefesh as {
                                    id: string,
                                    fullName: string,
                                    roleId: number,
                                    email: string,
                                    iat: number,
                                    exp: number
                                };
                                if(decodedRefeshTyped.exp>currentTime){
                                    next()
                                }else{
                                    return res.status(401).json({
                                        status:" Expires token!Log in again",
                                        statusCode:401
                                    })
                                }

                        }}
                    } 
                    
                } catch (error) {
                    return res.status(401).json({
                        status:"You dont have permission!",
                        statusCode:401

                    })
                  
                 
                }
                
              
            }
           
        }
          
  
          
        }
  
        
  
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:'Internal Server',
            statusCode:500

        })
            
        
    }


}