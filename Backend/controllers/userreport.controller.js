import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { usercar } from "../models/Usercar.model.js"
import { accidentreport } from "../models/Report.model.js"
import sendMail from '../services/gmail.service.js'


export const reportaccidents=asyncHandler(async(req,res)=>{
   const{userEmail,location,carNumber}=req.body;
   const userOfCar=await usercar.findOne({carNumber});
   if(!userOfCar) return new ApiError(409,"car Not found");
   console.log(userOfCar);
   const alreadyReported=await accidentreport.findOne({carNumber});
   if(alreadyReported) {
    console.log("already done")
    return "already Reported";

}
   try {
    
    const sendmail=await sendMail(userOfCar.guardianEmail,carNumber,location);
    console.log(sendmail);
    if(sendmail){
        accidentreport.create({
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
    console.log(error)
   }
})