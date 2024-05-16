import { driver } from "../models/Driver.model.js";

export const driverWatcher=async(io)=>{
    const changeStream=driver.watch([],{fullDocument:'updateLookup'});
    changeStream.on('change',(event)=>{
        if(event.operationType === "update"){
                const fullDocument=event.fullDocument;
                console.log(fullDocument);
                io.to(String(fullDocument._id)).emit(
                    "Location_changed",
                    fullDocument
                )
        }
    }
    )
}