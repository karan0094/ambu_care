import mongoose from "mongoose";


const Schema=new mongoose.Schema({
    carNumber:{
        type:String,
        required:[true,"enter your canr number"],
        unique:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"UserDetail",
        required:[true,"a user must be there"]
    },
    guardianEmail:{
        type:String,
        required:[true,"a guardian email is required"]
    }

})

export const usercar=mongoose.model("usercar",Schema)