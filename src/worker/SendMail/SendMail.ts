import amqplib from 'amqplib'
import 'dotenv/config'
export const sendMail =async ({msg ,taskName}:any)=>{
    try{
        const amqp_url_cloud =process.env.amqp_url_cloud || ''
        const connection = await amqplib.connect(amqp_url_cloud); // create connection
        const channel =await connection.createChannel()
        const nameQueue =taskName
        if(taskName =='signUp'){
            await channel.assertQueue(nameQueue, {
                durable: false, 
              });
              ///send msg to queue
            const bufferData = Buffer.from(JSON.stringify(msg));
            await channel.sendToQueue(nameQueue, bufferData, {
                expiration: "10000", ///=>TTL time to live
                persistent: true, /// luu vao disk de backup msg
              }); 
              setTimeout(() => {
                connection.close();
               
                }, 2000);

        }
        
       
      

    }catch(error){
        console.log(error)
    }
}