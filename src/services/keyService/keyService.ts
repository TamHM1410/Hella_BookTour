"use strict"
import keys from "../../models/KeyModel"
import mongoose from "mongoose";

interface KeyServiceParams {
    userId: mongoose.Types.ObjectId | string;
    publicKey: string | Buffer; // Adjust the type based on your actual data type
    refreshKey: string;
}


class KeyService{
    createKeyToken = async ({ userId, publicKey, refreshKey }: KeyServiceParams) => {
        try {
            const publicKeyString = publicKey.toString();
    
            // Check if the key entry exists
            const exist = await keys.findOne({ userId: userId });
    
            if (exist) {
                const token = await keys.findByIdAndUpdate(
                    { userId: userId },
                    {
                        publicKey: publicKeyString,
                        refreshKey: refreshKey,
                        $push: { usedRefreshToken: exist.refreshKey }
                    },
                    { new: true } // To get the updated document
                );
    
                console.log(token);
                return token ?(await token.save()) && publicKeyString : null;
            }else{
                const newToken = new keys({
                    userId:userId,
                    publicKey:publicKey,
                    refreshKey:refreshKey
                })
                return newToken ?(await newToken.save()  )&& publicKeyString :null

            }
        } catch (error) {
            console.log(error);
        }
    };
    
}
const keyService =new KeyService()
export default keyService