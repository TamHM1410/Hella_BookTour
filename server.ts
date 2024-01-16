import { app } from "./src/app";
import 'dotenv/config'
const Port =process.env.PORT
app.listen(Port,()=>{
    console.log('App listen',Port)
})