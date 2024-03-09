import {   Request,Response } from "express";
import 'dotenv/config'
import crypto from "crypto";
import querystring from 'qs'
import { randomBytes } from 'crypto';

import { bookingService } from "../services/bookingService/booking.service";
import { PrismaClient } from "@prisma/client";
import { receiveMail } from "../worker/receiveMail/receiveMail";
import { sendMail } from "../worker/SendMail/SendMail";
import User from "../models/UserModel";
import { instanceMongo } from "../dbs/MongoDB/instanceMongo";
import { Booking } from "@prisma/client";


import moment from "moment";
import mongoose from "mongoose";





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
            console.log(vnp_Params)
            if (!secretKey) {
                throw new Error("Missing secretKey in environment variables.");
            }
            
            const signData = querystring.stringify(vnp_Params, { encode: false });
    
            const hmac = crypto.createHmac("sha512", secretKey);
            const signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
            const paymentStatus = vnp_Params["vnp_ResponseCode"]
            console.log(paymentStatus,'payment'); // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
            //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
            //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó
            const checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
            const checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
            try {
              if (secureHash === signed) {
                  // Kiểm tra checksum
                  if (checkOrderId) {
                      if (checkAmount) {
                          if (paymentStatus == "00") {
                              if (rspCode == "00") {
                                  const stringId = vnp_Params['vnp_OrderInfo'];
                                  console.log(stringId);
                                  if (typeof stringId === 'string') {
                                      const parts = stringId.split("%3A");
                                      const id = +parts[0];
                                      const userId = parts[1];
                                      const status = true;
                                      const updateBooking = await bookingService.updateStatusById(id, status);
                                      let storeBooking: Booking | undefined;
                                      if (Array.isArray(updateBooking) && updateBooking.length > 0) {
                                          storeBooking = updateBooking[0];
                                      }
          
                                      await instanceMongo();
                                      const userData = await User.findById({_id:new mongoose.Types.ObjectId(userId)});
                                      const data = await this.prisma.trip.findMany({
                                          where: {
                                              id: storeBooking?.tripId
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
                                                          include:{
                                                              location:true
                                                          }
                                                      }
                                                  }
                                              }
                                          }
                                      });
          
                                      const mergeData = {...data,...userData};
          
                                      const msg = {
                                          tripInfor: mergeData['0'],
                                          userInfor: mergeData._doc
                                      };
                                      const email=userData.email ?? "hunhminhtam@gmail.com"
                                      const taskName: string = 'checkOut';
                                      await receiveMail(taskName,email);
                                      await sendMail({msg, taskName});
          
                                      if (updateBooking) {
                                          return res.status(200).json({ RspCode: "00", Message: "Success" });
                                         
                                      }
                                      await bookingService.deleteBookingByStatusAndCurrentDate(userId);
          
                                  
                                      return res.status(200).json({ RspCode: "00", Message: "Success" });
                                  }
                                  //thanh cong
                                  //paymentStatus = '1'
                                  // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
                                  return res.status(200).json({ RspCode: "00", Message: "Success", status: "Success", statusCode: 200 });
                              } else {
                                  //that bai
                                  //paymentStatus = '2'
                                  // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
                                  return res.status(200).json({ RspCode: "00", Message: "Success" });
                              }
                          } else {
                              return res.status(400).json({
                                  status: "Transaction failed",
                                  statusCode: 400,
                                  RspCode: "02",
                                  Message: "Transaction failed",
                              });
                          }
                      } else {
                          return res.status(200).json({ RspCode: "04", Message: "Amount invalid" });
                      }
                  } else {
                      return res.status(200).json({ RspCode: "01", Message: "Order not found" });
                  }
              } else {
                  return res.status(200).json({ RspCode: "97", Message: "Checksum failed" });
              }
          } catch (error) {
              console.error("Error occurred:", error);
              return res.status(500).json({ RspCode: "99", Message: "Internal Server Error" });
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
        await instanceMongo()
    
        await this.prisma.$connect
        const taskName:string='signUp'
        const id='65e841d6f5cb272f4e90d606'
        const userData = await User.findById({_id:new mongoose.Types.ObjectId(id)})
  
        // const msg = {
        //   userId: 1,
        //   hashed: 123,
        //   name: "huynh minh tam dep trai",
        //   email: "hunhminhtam@gmail.com",
        //   hotel: {
        //     image_hotel:
        //       "https://cf.bstatic.com/xdata/images/hotel/max1024x768/429295606.jpg?k=5c62aed1bdb662edadb8c6cec2c44d46ee93ae173a43116c7b1845556e66474e&o=&hp=1",
        //     address: "FPT,Long Thanh My,district 9,HCM city",
        //     checkIn: "21-12-2023",
        //     checkOut: "23-12-2023",
        //     timecancle: "From 08:29 November 13 Ho Chi Minh time",
        //     price: 300000,
        //     qualities: 1,
        //     period: 1,
        //     num_guest: 2,
        //   },
        //   transportation: {
        //     car: "xe lon",
        //     rent_start: "27-12-2023",
        //     rend_return: "29-12-2023",
        //     period: 2,
        //     pricePerDay: 180000,
        //     qualities: 1,
        //     driver: "Nguyen hoang thien",
        
        //     car_image:
        //       "https://th.bing.com/th/id/OIP.yVlZzbhOA5kI3MnVBmcPggHaEK?rs=1&pid=ImgDetMain",
        //   },
        // };

      
        const data = await this.prisma.trip.findMany({
          where: {
            id: 1
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
                  include:{
                    location:true
                  }
                }
              }
            }
          }
        });
        
        const mergeData = {...data,...userData}
       
        const msg= {
          tripInfor:mergeData['0'],
          userInfor:mergeData._doc
        }
        console.log(data[0])
        //   await receiveMail(taskName)
        // await sendMail({msg,taskName})
        
        return res.status(200).json({em:'hihih',msg})
        
        
        
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