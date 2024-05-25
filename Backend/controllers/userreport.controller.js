import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { usercar } from "../models/Usercar.model.js"
import { accidentreport } from "../models/Report.model.js"
import { mailService } from "../services/mailjet.service.js"


export const reportaccidents=asyncHandler(async(req,res)=>{
   const{userEmail,location,carNumber}=req.body;
   const userOfCar=await usercar.findOne({carNumber});
   if(!userOfCar) return new ApiError(409,"car Not found");
   const alreadyReported=await accidentreport.findOne({carNumber});
   if(alreadyReported) return "already Reported";
   try {
    
    const sendMail=await mailService(userOfCar.guardianEmail,carNumber,location,userEmail);
    if(sendMail){
        reportaccidents.create({
            location,
            carNumber,
            user:userOfCar.user,
            reporterEmail:userEmail,
            guardianEmail:userOfCar.guardianEmail,

        })
    }
    return res.status(200).json(
        new ApiResponse(200,{},"accident Reported")
    )
 
   } catch (error) {
    return res.status(500).json(
        new ApiResponse(500,{},error))
   }
})