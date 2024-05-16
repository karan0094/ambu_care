import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import UserDetails from "../models/UserDetails.model.js";
import { driver } from "../models/Driver.model.js";

export const verifyJwt=asyncHandler(async(req,res,next)=>{
 try {
  
    const token =req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
     
      
       if(!token) throw new ApiError(401,"Unauthorized request");
      
       const decodedToken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
   
       const user= await UserDetails.findById(decodedToken._id).select("-password -refreshToken")
       if(!user) throw new ApiError(401,"Inval access token")
   
   
       req.user=user;
       next()
 } catch (error) {
    throw new ApiError(401,error?.message || "Invalid access token")
 }
})

export const verifyJwtDriver=asyncHandler(async(req,res,next)=>{
   try {
      
      const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
     
      if(!token) throw new ApiError(401,"token is not there");
     
      const decodedToken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

      const driverDetails=await driver.findById(decodedToken._id).select("-password -refreshToken")
      if(!driverDetails) throw new ApiError(401,"INvalid access token")
      req.driver=driverDetails;
      next()




   } catch (error) {
      throw new ApiError(401,error?.message,"Invalid access token for driver")
   }
})