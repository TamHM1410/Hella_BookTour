import amqplib from 'amqplib'
import 'dotenv/config'
import nodemailer from 'nodemailer'
import { checkOut } from '../tempeleteMail/Booking.templete'
import { sendOtp } from '../tempeleteMail/SendOtp.templete'
export const receiveMail =async (taskName:any,email:string)=>{
    try{
        const amqp_url_cloud =process.env.amqp_url_cloud || ''
        const connection = await amqplib.connect(amqp_url_cloud); // create connection
        const channel =await connection.createChannel()
        const nameQueue =taskName
       
        if (taskName === "checkOut") {
     
    
      
          ////4  create queue
    
          await channel.assertQueue(nameQueue, {
            durable: false, ////mat hang doi khi server crash
          });
          await channel.consume(
            nameQueue,
            (msg) => {
              
              const data = JSON.parse(msg?.content?.toString() ?? '{}');
    
              const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: "hunhminhtam@gmail.com",
                  pass: "vtdg imfi lcgs bpzy",
                },
              });
    
              const mailOptions = {
                from: "HellaBooking@gmail.com",
                to: data.userInfor.email,
                subject: "Thank for Booking",
                text: `Name:${JSON.stringify(msg?.content.toString())}`,
                html: checkOut(data),
              };
    
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });
            },
            {
              noAck: true,
            }
          );
        }
        
        if (taskName === "sendOtp") {
     
    
      
          ////4  create queue
    
          await channel.assertQueue(nameQueue, {
            durable: false, ////mat hang doi khi server crash
          });
          await channel.consume(
            nameQueue,
            (msg) => {
              
              const data = JSON.parse(msg?.content?.toString() ?? '{}');
    
              const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: "hunhminhtam@gmail.com",
                  pass: "vtdg imfi lcgs bpzy",
                },
              });
    
              const mailOptions = {
                from: "HellaBooking@gmail.com",
                to: data.email,
                subject: "Your OTP",
                text: `Name:${JSON.stringify(msg?.content.toString())}`,
                html: sendOtp(data),
              };
    
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });
            },
            {
              noAck: true,
            }
          );
        }
        
      

    }catch(error){
        console.log(error)
    }
}