import { ride } from "../models/Ride.model.js";
import { availableDrivers } from "../controllers/ride.controller.js";
import { rideAccepted } from "../controllers/ride.controller.js";
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
               
            if(avd){
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
                        rideAccepted(data);
                       
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
                 if(request==="canmakerequest"){
                    
                    repetition=setInterval(sendRequest,0);
                 }
                 else{
                    repetition=setInterval(sendRequest,30100);
                 }
                 if(index===avd.length || index==4) clearInterval(repetition)
              
            }
            const repetition=setInterval(sendRequest,0)
            console.log("bhai exit hogaya hai")

        }
        else{
            console.log(avd,"yaa toh khali hai")
        }
        }
        if(event.operationType === "update"){
            if(fullDocument.status==="driverassigned"){
            io.to(String(fullDocument._id)).emit("Ride_Assigned",fullDocument)
        }
            if(fullDocument.status==="cancelled"){
                io.to(String(fullDocument._id)).emit("Cancelled","No ambulance Near You");
            }
            if(fullDocument.status==="completed"){
                io.to(String(fullDocument._id)).emit("Completed","Pay Your Bill");
            }
    }
    })
}




