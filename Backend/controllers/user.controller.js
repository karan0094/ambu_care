import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import UserDetails from "../models/UserDetails.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken=async(userId)=>{
try{
  const user= await UserDetails.findById(userId)
   const access=await user.generateAccessToken()
   const refresh= await user.generateRefreshToken()
   
   user.refreshToken=refresh
   await user.save({validateBeforeSave:false})

   return {refresh ,access}
}
catch(error){
   throw new ApiError(500,error,"Something went wrong while generating refresh and access token")

}
}
const registerUser = asyncHandler(async(req,res)=>{
   const {username,email,dob,phoneNumber,password}=req.body
    console.log(req.body);

   const user=await UserDetails.findOne({email})

   if(user){
    throw new Error(409,"user already registered")
   }
   const userCreated=await UserDetails.create({
    username,
    email,
    phoneNumber,
    dob,
    password
    
   })
   const creates= await UserDetails.findById(userCreated._id).select(
    "-password -refreshToken -dob"
   )
   if(!creates) throw new ApiError(500,"something went wrong while registering the user")
   return res.status(201).json(
      new ApiResponse(200, creates ,"user registered" )
      )
})
const loginUser= asyncHandler(async(req,res)=>{
   const {email,password}=req.body
  
   if(!email || !password) throw new ApiError(400,"email and password cannot be empty")
   const user=await UserDetails.findOne({email})
  
   if(!user) throw new ApiError(400,"user not registered")
   const isPasswordValid=await user.isPasswordCorrect(password)
   if(!isPasswordValid) throw new ApiError(401,"Invalid credentials")

  const {access,refresh}= await generateAccessAndRefreshToken(user._id)
  
  const loggedIn=await UserDetails.findById(user._id).select("-password -refreshToken")

  const options={
   httpOnly:true,
   secure:true
  }

  return res.status(200).cookie("accessToken",access,options)
  .cookie("refreshToken",refresh,options).json(
   new ApiResponse(200,{
      user:loggedIn,access,refresh
   }
   ,"user Logged in successfully")
  )


})
const loggedOut=asyncHandler(async(req,res)=>{
   await UserDetails.findByIdAndUpdate(
      req.user._id,{
         $unset:{
            refreshToken:1
         }
      },{
         new :true
      }
   )
   const options={
      httpOnly:true,
      secure:true
     }

     return res.status(200)
     .clearCookie("accessToken",options)
     .clearCookie("refreshToken",options)
     .json(new ApiResponse(200,{},"user logged out"))
})

export {registerUser,loginUser,loggedOut}