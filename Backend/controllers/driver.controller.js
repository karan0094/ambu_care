import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {driver} from '../models/Driver.model.js'

const generateAccessAndRefreshToken=async(driverId)=>{
    const driverDetails=await driver.findById(driverId)
    const accessToken=driverDetails.generateAccessToken()
    const refreshToken=driverDetails.generateRefreshToken() 
     
    driver.refreshToken=refreshToken;
    await driverDetails.save({validaionBeforeSave:false})

    return {refreshToken,accessToken}
}



const driverRegister=asyncHandler(async(req,res)=>{
    const {username,firstName,middleName,lastName,mobileNumber,email,ambulanceNumber,ambulanceType, organizationAffiliated,password}=req.body;
    console.log(req.body)
    const driverDetails=await driver.findOne({username});
    if(driverDetails) throw new ApiError(409,"driver already registered with us")
    const createDriver=await driver.create({
        username,
        firstName,
        middleName,
        lastName,
        mobileNumber,
        email,
        ambulanceNumber,
        ambulanceType,
        organizationAffiliated,
        password
       
        })
        const createdDriver = await driver.findById(createDriver._id).select("-password -refreshToken -location")
        if(!createdDriver) throw new ApiError(500,"user not created")
        return res.status(201).json(
         new ApiResponse(200,createdDriver,"Driver Registered Successfully")
        )
});


const loginDriver=asyncHandler(async(req,res,next)=>{
    const{email,password}=req.body;
    const driverExist=await driver.findOne({email});
    if(!driverExist) throw new ApiError(400,"driver not Registered")
    const isPasswordValid=await driverExist.isPasswordCorrect(password)
    if(!isPasswordValid) throw new ApiError(409,"password Incorrect") 

    const {refreshToken,accessToken}=await generateAccessAndRefreshToken(driverExist._id)
    const driverDetails=await driver.findById(driverExist._id).select("-password -refreshToken ")
    const options={
        httpOnly:true,
        secure:true
       }
    return res.status(200).cookie("refreshToken",refreshToken,options).cookie("accessToken",accessToken,options).json(
       new ApiResponse(200,
            {driver:driverDetails,accessToken,refreshToken}
        
        )
    )
})

const logOut=asyncHandler(async(req,res)=>{
  await driver.findByIdAndUpdate(req.driver._id,{
    $unset:{
        location:1,
        refreshToken:1
    }
  },{
    new:true
  })

  const options={
    httpOnly:true,
    secure:true
  }
return res.status(200).clearCookie("accessToken",options).clearCookie("refreshToken",options)
.json(new ApiResponse(
    200,{},
    "driver loggedOut"
))

})
async function updateLocation(data){
  console.log(data)
  const position=data.position;
  const latitude=position.lat;
  const longitude=position.lng;
 
  await driver.findByIdAndUpdate(data.id,{
    $set:{
        location:{type:"Point",coordinates:[latitude,longitude]}
    }
  })
 
}

export {driverRegister,loginDriver,logOut,updateLocation}