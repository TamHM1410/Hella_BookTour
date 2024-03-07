import {   Request,Response } from "express";
import 'dotenv/config'
import crypto from "crypto";
import querystring from 'qs'
import { randomBytes } from 'crypto';

import { bookingService } from "../services/bookingService/booking.service";
import { PrismaClient } from "@prisma/client";


import moment from "moment";





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
  private prisma = new PrismaClient();
  constructor() {
    this.prisma = new PrismaClient();
  }
    returnIPN =async (req:Request, res:Response )=>{
        try{
            
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
    
            let vnp_Params = req.query;
            // console.log('quet',req.query)
       
            const secureHash = vnp_Params["vnp_SecureHash"];
          
            const orderId = vnp_Params["vnp_TxnRef"];
            const rspCode = vnp_Params["vnp_ResponseCode"];
          
            delete vnp_Params["vnp_SecureHash"];
            delete vnp_Params["vnp_SecureHashType"];
            vnp_Params = sortObject(vnp_Params);
            const tmnCode = process.env.vnp_TmnCode;
            const secretKey = process.env.vnp_HashSecret;
            if (!secretKey) {
                throw new Error("Missing secretKey in environment variables.");
            }
            
            const signData = querystring.stringify(vnp_Params, { encode: false });
    
            const hmac = crypto.createHmac("sha512", secretKey);
            const signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
            const paymentStatus = "0"; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
            //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
            //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó
            const checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
            const checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
            if (secureHash === signed) {
                //kiểm tra checksum
                if (checkOrderId) {
                  if (checkAmount) {
                    if (paymentStatus == "0") {
                      //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
                      if (rspCode == "00") {

                        const stringId =vnp_Params['vnp_OrderInfo']
                        console.log(stringId)
                        if (typeof stringId === 'string') {
                            const parts = stringId.split("%3A");
                            const id = +parts[0];
                            const userId = parts[1];
                            const status=true
                            const updateBooking =await bookingService.updateStatusById(id,status)
                            if(updateBooking){
                              res.status(200).json({ RspCode: "00", Message: "Success" });

                            }
                          

                            const deleteBooking=  await bookingService.deleteBookingByStatusAndCurrentDate(userId)
                            
                        }
                        //thanh cong
                        //paymentStatus = '1'
                        // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
                        res.status(200).json({ RspCode: "00", Message: "Success" });
                      } else {
                        //that bai
                        //paymentStatus = '2'
                        // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
                        res.status(200).json({ RspCode: "00", Message: "Success" });
                      }
                    } else {
                      res.status(200).json({
                        RspCode: "02",
                        Message: "This order has been updated to the payment status",
                      });
                    }
                  } else {
                    res.status(200).json({ RspCode: "04", Message: "Amount invalid" });
                  }
                } else {
                  res.status(200).json({ RspCode: "01", Message: "Order not found" });
                }
              } else {
                res.status(200).json({ RspCode: "97", Message: "Checksum failed" });
              }




        }catch(error){
            console.log(error)
            return res.status(500).json({
                status:"internal server",
                statusCode:500
            })
        }
    }
     test =async (req:Request, res:Response )=>{
      try{
        await this.prisma.$connect
        const data = await this.prisma.trip.findMany({
          where: {
            id: 3
          },
          include: {
            tour: {
              select: {
                tourName: true,
                tourType: true,
                price: true,
                image: true,
                vehicleType: {
                  select: {
                    vehicleName: true,
                    capacity: true
                  }
                },
                locationinTour:{
                  select:{
                    locationId:true,
                     location:{
                      select:{
                        id:true,
                        locationAddress:true,
                        locationName:true
                      }
                    }
                  }
                }
              }
            }
          }
        });
        
        return res.status(200).json(data)
        
        
      }catch(error){
        console.log(error)
      }
    }
    
    createVnpay =async  (req:Request, res:Response    ) => {
        try {
            const date = new Date();
            const createDate = moment(date).format("YYYYMMDDHHmmss");
            const generateRandomString = (length: number): string => {
                const bytes = randomBytes(Math.ceil(length / 2));
                return bytes.toString('hex').slice(0, length);
              };
            
            
            
            const ipAddr = req.headers['x-forwarded-for'] ||
                req.socket.remoteAddress ||
                (req.socket as any).remoteAddress;
    
            const tmnCode = process.env.vnp_TmnCode;
            const secretKey = process.env.vnp_HashSecret;
            let vnpUrl = process.env.vnp_Url ;
            const returnUrl = process.env.vnp_ReturnUrl;
            const bankCode = req.body.bankCode;
            const orderId =generateRandomString(10);
            const userId =req.headers.userid
            console.log(userId,'userId')
            const id =req.body.bookingId //bookingId
            const  bookingDate =await bookingService.getById(id)
            const  amount = bookingDate?.data?.totalAmount ??0
            let locale = req.body.language;
            if (locale === null || locale === '') {
                locale = 'vn';
            }
            const currCode = 'VND';
            const orderInfor = `${id}:${userId}`;
            console.log('orderInfor',orderInfor)
    
            let vnp_Params :VnpParams = {
                vnp_Version: '2.1.0',
                vnp_Command: 'pay',
                vnp_TmnCode: tmnCode ,
                vnp_Locale: locale,
                vnp_CurrCode: currCode,
                vnp_TxnRef: orderId,
                vnp_OrderInfo: orderInfor,
                vnp_OrderType: "other",
                vnp_Amount: amount ,    
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