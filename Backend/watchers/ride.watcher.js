import { ride } from "../models/Ride.model.js";
import { availableDrivers } from "../controllers/ride.controller.js";
import { rideAccepted } from "../controllers/ride.controller.js";
import { markCancelled } from "../controllers/ride.controller.js";
export const ridewatcher=async(io)=>{
    const changeStream=ride.watch([],{fullDocument:'updateLookup'})
    changeStream.on('change',async(event)=>{
        const fullDocument=event.fullDocument;
        if(event.operationType==='insert'){
            const userlocation={type:"Point",coordinates:[parseFloat(fullDocument.userLocation.coordinates[0]),parseFloat(fullDocument.userLocation.coordinates[1])]}
            console.log(userlocation,fullDocument.ambulanceType)
            const avd= await availableDrivers(userlocation,fullDocument.ambulanceType)
            // if(avd){
            //     console.log(avd);
            // avd.map(driver=>{
            //     console.log(driver._id+driver.ambulanceType)
            //     io.emit(driver._id+driver.ambulanceType,fullDocument)
            // })        
            
            if(avd.length!==0){
                console.log(avd);  
                console.log("avd printed");
            let index=0;
          
            function sendRequest(){
                let request="";
              clearInterval(repetition);
              const driverid=avd[index]._id
              const ambulanceType=avd[index].ambulanceType
              io.emit(driverid+ambulanceType,{...fullDocument,...avd[index].dist})
              index++;
             
              io.on("connection",(socket)=>{
                    socket.on("requestAccepted",(data)=>{
                        clearInterval(repetition);
                    })
                    socket.on("rejected",(data)=>{
                        if(index!==avd.length){
                            request="canmakerequest";
                        }
                        else{
                            markCancelled(data.service_id);
                        }
                    })
                 })
                 if(index===avd.length || index==4) clearInterval(repetition)
                 if(request==="canmakerequest"){
                    
                    repetition=setInterval(sendRequest,0);
                 }
                 else if(index<5 && index<avd.length){
                    repetition=setInterval(sendRequest,30100);
                 }
                
              
            }
            var repetition=setInterval(sendRequest,0)
            console.log("bhai exit hogaya hai")

        }
        else{
            console.log("bhai cancel")
            markCancelled(fullDocument._id);
        }
        }

        if(event.operationType === "update"){
            if(fullDocument.status==="cancelledByUser"){
                io.to(String(fullDocument.user))     .emit("cancelledByUser","cancelled by user")
            }
            if(fullDocument.status==="driverassigned"){
            io.to(String(fullDocument._id)).emit("Ride_Assigned",fullDocument)
        }
            if(fullDocument.status==="cancelled"){
                console.log("emit krdiya cancelled");
                io.to(String(fullDocument._id)).emit("Cancelled","No ambulance Near You");
            }
            if(fullDocument.status==="completed"){
                io.to(String(fullDocument.driver)).emit("Completed","Ambulance is Here");
            }
    }
    })
}




