import { driver } from "../models/Driver.model";

export const driverWatcher=async(io)=>{
    const changeStream=driver.watch([],{fullDocumnet:'updateLookup'});
    changeStream.on('change',(event)=>{
        if(event.operationType === "update"){
                const fullDocument=event.fullDocument;
                io.to(String(fullDocument._id)).emit(
                    "Location_changed",
                    fullDocument
                )
        }
    }
    )
}