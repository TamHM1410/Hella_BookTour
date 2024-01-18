import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const  keySchema= new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true,
        index:true,
        ref:"users"
    },
    publicKey:{
        type:String,
        required:true,
        unique:true,
    },
    refreshKey:{
        type:String,
        required:true,
        unique:true,
    },
    usedRefreshToken:{

        type:Array,
        default:[]
        
    }
},{
    timestamps:true,
    collection:'keys'
});

//Export the model
 const keys = mongoose.model('keys', keySchema);
 export default keys