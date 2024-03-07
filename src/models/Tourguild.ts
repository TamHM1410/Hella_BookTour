import mongoose from "mongoose";


// Declare the Schema of the Mongo model
const tourguideShcema = new mongoose.Schema({
    
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        unique:true,
        ref:'User'
    },
     status :{
        type:Boolean,
        default:false
        
    },
    language:{
        type:Array,
        
        default:['Viet Nam']
    },
    deleteAt:{
        type:Date,
        default:null
    }
},{
    timestamps:true
});

//Export the model
const tourguide = mongoose.model('Tourguide', tourguideShcema);
export default tourguide