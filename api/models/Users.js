import mongoose from 'mongoose';
// const {schema} = mongoose;

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
       required:true,
        
    },
    email:{
        type: String,
        required:true,
       
        
       
    },
     password:{
        type: String,
        
       
        
      
     },
     
    is_verified:{
        type:Boolean,
        default:false,
      },
      is_block:{
        type:Boolean,
        default:0
    },

     country:{
        type:String,
        

     },
      otp:{
        type:Number,
        default:" "
    },
     img:{
        type:String,

     },
     city:{
        type:String,
        

     },
     phone:{
        type:String,
     
        

     },
     
     isAdmin:{
        type:Boolean, 
        default:false
     }
     

},{timestamps:true})

export default mongoose.model("Users",UserSchema);