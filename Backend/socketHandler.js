// import { Server } from "socket.io";
import { updateLocation } from "./controllers/driver.controller.js";
import { markCancelled, rideAccepted, rideCompleted } from "./controllers/ride.controller.js";
import { markCancelledByUSer } from "./controllers/ride.controller.js";
const socketHandler=(io)=>{
    io.on('connection',(socket)=>{
        console.log(socket.id);
        socket.on('locationChanged',async(data)=>{
           await  updateLocation(data)
        })
        socket.on("join_room",(service_id)=>{
          console.log("user joined this room"+service_id);
            socket.join(service_id);
            //to listen for user service request
        })
        socket.on("requestAccepted",(data)=>{
            console.log("yaha pahuch gaya")
            rideAccepted(data);
        })
        socket.on("rideCompleted",(data)=>{
            rideCompleted(data);
        })
        socket.on("cancelRideByUser",(driverId)=>{
            markCancelledByUSer(driverId);
            console.log("reached here to cancel")

        })
        socket.on('disconnect',()=>{
            console.log("a user has been disconnected")
        })
    })
}

export default socketHandler;