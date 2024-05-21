import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { usercar } from "../models/Usercar.model.js"


const registerCar=asyncHandler(async(req,res)=>{
const{user,carNumber,guardianEmail}=req.body;
console.log(req.body);
const alreadyExist=await usercar.findOne({carNumber})
if(alreadyExist)  throw new Error(408,"car already registered") 
try {
     const created=await usercar.create({user,carNumber,guardianEmail})
     return res.status(201).json(
        new ApiResponse(200, created ,"your car registered successfully" )
        )
 } catch (error) {
   throw new ApiError(500,error);  
 }

})

export {registerCar}