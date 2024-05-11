// import { Server } from "socket.io";
import { updateLocation } from "./controllers/driver.controller.js";
const socketHandler=(io)=>{
    io.on('connection',(socket)=>{
        console.log(socket.id);
        socket.on('locationChanged',async(data)=>{
           await  updateLocation(data)
        })
        socket.on('disconnect',()=>{
            console.log("a user has been disconnected")
        })
    })
}

export default socketHandler;