import mongoose from "mongoose";

 export const GeoSchema=new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
});



const Schema=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"UserDetail",
        required:[true,"a user must be there"]
    },
    driver:{
        type:mongoose.Types.ObjectId,
        ref:"driver",
       
    },
    ambulanceType:{
        type:String,
        required:[true,"select a vechile type "],
        lowercase:true,
        trim: true ,
    },
    userLocation:{
        type:GeoSchema,
        required:[true,"user location is needed"],
    }
    ,status:{
        type:String,
        required:[true,"what is the ride status"]
    }
    
}) 

export const ride=mongoose.model("ride",Schema)