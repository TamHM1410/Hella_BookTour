import amqplib from 'amqplib'
import 'dotenv/config'
import nodemailer from 'nodemailer'
import { checkOut } from '../tempeleteMail/Booking.templete'
export const receiveMail =async (taskName:any)=>{
    try{
        const amqp_url_cloud =process.env.amqp_url_cloud || ''
        const connection = await amqplib.connect(amqp_url_cloud); // create connection
        const channel =await connection.createChannel()
        const nameQueue =taskName
        // if(taskName =='signUp'){
        //     await channel.assertQueue(nameQueue, {
        //         durable: false, 
        //       });
        //     await channel.consume(nameQueue,(msg)=>{
        //         const data = JSON.parse(msg?.content?.toString() ?? '{}');
        //         const transporter = nodemailer.createTransport({
        //             service: "gmail",
        //             auth: {
        //               user: "hunhminhtam@gmail.com",
        //               pass: "vtdg imfi lcgs bpzy",
        //             },
        //           });
          
        //           // Định nghĩa nội dung email
        //           const mailOptions = {
        //             from: "hunhminhtam@gmail.com",
        //             to: "hunhminhtam@gmail.com",
        //             subject: "Test Email",
        //             text: `Name:${JSON.stringify(msg?.content.toString())}`,
        //             html: checkOut(data[0]),
        //           };
          
        //           // Gửi email
        //           transporter.sendMail(mailOptions, (error, info) => {
        //             if (error) {
        //               console.error(error);
        //             } else {
        //               console.log("Email sent: " + info.response);
        //             }
        //           });
          
        //           console.log("message", data[0]);
        //           setTimeout(() => {
        //             connection.close();
        //             process.exit(0);
        //         }, 2000);
        //     },{
        //         noAck:true
        //     })
             

        // }
        if (taskName === "signUp") {
     
    
      
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
                from: "hunhminhtam@gmail.com",
                to: "hunhminhtam@gmail.com",
                subject: "Test Email",
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
        
      

    }catch(error){
        console.log(error)
    }
}