import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ride } from "../models/Ride.model.js"
import { driver } from "../models/Driver.model.js"
// export const fetchRide=asyncHandler(async(req,res)=>{
//     const{user}=req.body;
//     const rides=await ride.find(user)
//     return res.status(204,rides,"Rides booked by user")
// })



export const rideRequest=asyncHandler(async(req,res)=>{
        const{user,userLocation,ambulanceType,status}=req.body;
        console.log(user,userLocation)
        const newRide=await ride.create({
            user,userLocation,status,ambulanceType
        })
       
       
        return res.status(200).json(new ApiResponse(200,newRide,"Request has been made"));
              
})

export async function availableDrivers(userlocation,ambulanceType){
    console.log(userlocation,ambulanceType)

       const answer=await driver.aggregate([{$geoNear:{near:userlocation,
       distanceField:"dist.calculated",
       maxDistance:5000,
       query:{ambulanceType:ambulanceType},
       spherical:true}}
    ,{
        $project:{
         password:0,
         refreshToken:0
        }
    }])
       return answer;
}
 export const driverRideDetails=asyncHandler(async(req,res)=>{
    const id=req.driver._id || req.user._id;
    
   
        const rideData=await ride.find({driver:id});
        return res.status(200).json(new ApiResponse(200,rideData,rideData?"Data":"nodata"))
    
 })
 export const userRideDetails=asyncHandler(async(req,res)=>{
    const id= req.user._id;
   
        const rideData=await ride.find({user:id});
        return res.status(200).json(new ApiResponse(200,rideData,rideData?"Data":"noData"));
   
    
 })
export async function markCancelled(data){
    const serviceId=data;
    try {
        await ride.findByIdAndUpdate(serviceId,{
            $set:{
                status:"cancelled"
            }
        })
    } catch (error) {
        console.log(error);
    }
}
export async function rideAccepted(data){
    const driver=data.driver;
    const serviceId=data.serviceId;
    const status="driverassigned";

    try {
        await ride.findByIdAndUpdate(serviceId,{
           $set:{
            driver:driver,
            status:status,
           }
        })
    } catch (error) {
      throw error;  
    }

}