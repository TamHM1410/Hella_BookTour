import { NextFunction, Request,Response } from "express";
import 'dotenv/config'
import crypto from "crypto";
import querystring from 'qs'
import { format } from 'date-fns';

// export const vnPay = async (req:Request,res:Response)=>{
//     try{
//     let  vnp_Params = req.query;
//     const secureHash = vnp_Params['vnp_SecureHash'];

//     delete vnp_Params['vnp_SecureHash'];
//     delete vnp_Params['vnp_SecureHashType'];

//     vnp_Params = sortObject(vnp_Params);
    
//     const secretKey = process.env.vnp_HashSecret;
    // if (!secretKey) {
    //     throw new Error("vnp_HashSecret is not defined in environment variables.");
    // }

   
//     const signData = querystring.stringify(vnp_Params, { encode: false });
        
//     const hmac = crypto.createHmac("sha512", secretKey);
//     const signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     
     

//     if(secureHash === signed){
//         const orderId = vnp_Params['vnp_TxnRef'];
//         const rspCode = vnp_Params['vnp_ResponseCode'];
//         //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
//         res.status(200).json({RspCode: '00', Message: 'success'})
//     }
//     else {
//         res.status(200).json({RspCode: '97', Message: 'Fail checksum'})
//     }

//     }catch(error){
//         return  res.status(500).json({
//             status:"Internal Server",
//             statusCode:500
//         })
//     }
// }
interface VnpParams {
    vnp_Version: string;
    vnp_Command: string;
    vnp_TmnCode: string;
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
            const body =req.body
            
            const ipAddr = req.headers['x-forwarded-for'] ||
                req.socket.remoteAddress ||
                (req.socket as any).remoteAddress;
    
            const tmnCode = process.env.vnp_TmnCode;
            const secretKey = process.env.vnp_HashSecret;
            let vnpUrl: string = process.env.vnp_Url || '';
            const returnUrl = process.env.vnp_ReturnUrl;
    
            const date = new Date();
    
            const createDate = format(date, 'yyyymmddHHmmss');
            const orderId = format(date, 'HHmmss');
            const amount = req.body.amount;
            const bankCode = req.body.bankCode;
    
            const orderInfo = req.body.orderDescription
            const orderType = req.body.orderType;
            let locale = req.body.language;
            if (locale === null || locale === '') {
                locale = 'vn';
            }
            const currCode = 'VND';
    
            let vnp_Params: VnpParams = {
                vnp_Version: '2.1.0',
                vnp_Command: 'pay',
                vnp_TmnCode: tmnCode || '',
                vnp_Locale: locale,
                vnp_CurrCode: currCode,
                vnp_TxnRef: orderId,
                vnp_OrderInfo: orderInfo,
                vnp_OrderType: "other",
                vnp_Amount: amount ? amount * 100 : 0,
                vnp_ReturnUrl: returnUrl,
                vnp_IpAddr: ipAddr || '',
                vnp_CreateDate: createDate,
                vnp_BankCode:bankCode
                
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
            console.log(body,'test',vnpUrl)
    
            res.redirect(vnpUrl)
    
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