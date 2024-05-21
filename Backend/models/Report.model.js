import mongoose from "mongoose";
import { type } from "os";

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
    },
    reporterEmail:
    {
        type:String,
        required:[true,"a sender is must"]
    },
    location:{
        type:String,
        required:[true,"location of accident not given"]
    },
    createdAt: { type: Date, default: Date.now, expires: 60 }
})

export const accidentreport=mongoose.model("accidentreport",Schema);