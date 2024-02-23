import { NextFunction, Request,Response } from "express";
import 'dotenv/config'
import crypto from "crypto";
import querystring from 'qs'

import moment from "moment"


interface VnpParams {
    vnp_Version: string;
    vnp_Command: string;
    vnp_TmnCode: string |undefined;
    vnp_Locale: string;
    vnp_CurrCode: string;
    vnp_TxnRef: string;
    vnp_OrderInfo: string;
    vnp_OrderType: string;
    vnp_Amount: number;
    vnp_ReturnUrl: string |undefined;
    vnp_IpAddr: string;
    vnp_CreateDate: string;
    vnp_BankCode?: string;
    vnp_SecureHash?: string;
}

class VnpayController {
    
    createVnpay = (req:Request, res:Response, next:NextFunction) => {
        try {
            const date = new Date();
            const createDate = moment(date).format("YYYYMMDDHHmmss");
            
            
            
            const ipAddr = req.headers['x-forwarded-for'] ||
                req.socket.remoteAddress ||
                (req.socket as any).remoteAddress;
    
            const tmnCode = process.env.vnp_TmnCode;

            const secretKey = process.env.vnp_HashSecret;
            
            let vnpUrl = process.env.vnp_Url ;

            const returnUrl = process.env.vnp_ReturnUrl;
            const amount = req.body.amount;
            const bankCode = req.body.bankCode;
            const orderId =req.body.orderId;

            
           
           
         
            
    
            
            let locale = req.body.language;
            if (locale === null || locale === '') {
                locale = 'vn';
            }
            const currCode = 'VND';
    
            let vnp_Params :VnpParams = {
                vnp_Version: '2.1.0',
                vnp_Command: 'pay',
                vnp_TmnCode: tmnCode ,
                vnp_Locale: locale,
                vnp_CurrCode: currCode,
                vnp_TxnRef: orderId,
                vnp_OrderInfo: "Thanh toan cho ma GD:" + orderId,
                vnp_OrderType: "other",
                vnp_Amount: amount * 100,
                vnp_ReturnUrl: returnUrl,
                vnp_IpAddr: ipAddr ,
                vnp_CreateDate: createDate,
               
                
              };
            if (bankCode !== null && bankCode !== "") {
                vnp_Params["vnp_BankCode"] = bankCode;
              }
    
            if (!secretKey) {
                throw new Error("vnp_HashSecret is not defined in environment variables.");
            }
    
           
            const sortObject = (obj: any): any => {
                const sorted: any = {};
                const str: string[] = [];
                let key: string;
                for (key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        str.push(encodeURIComponent(key));
                    }
                }
                str.sort();
                for (key of str) {
                    sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
                }
                return sorted;
            };
    
    
            vnp_Params = sortObject(vnp_Params);
    
            const signData = querystring.stringify(vnp_Params, { encode: false });
    
            const hmac = crypto.createHmac("sha512", secretKey);
            const signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
            vnp_Params['vnp_SecureHash'] = signed;
            vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
            console.log(req.body,'test',vnpUrl)
            return res.status(200).json(vnpUrl)
    
          
    
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 'internal server',
                statusCode: 500
            });
        }
    }
    
}
export const vnpayController =new VnpayController()