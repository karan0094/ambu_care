// require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import connectDb from './db/index.js';
import UserDetails from "./models/UserDetails.model.js"
import express from 'express';
import cors from 'cors';
import cookies from "cookie-parser";
import http from 'http';
import {Server} from "socket.io"

import socketHandler from "./socketHandler.js";
dotenv.config({
    path:'./env'
})
const app=express();

app.use(cookies())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
const server=http.createServer(app);
const io=new Server(server,{ cors:{origin:"http://localhost:5173",method:["GET","POST"]},credentials:true,})

socketHandler(io);
import { ridewatcher } from "./watchers/ride.watcher.js";
import { driverWatcher } from "./watchers/driver.watcher.js";
connectDb()
.then(()=>{
    server.listen(process.env.PORT || 5000 ,async()=>{
       try {
       
        await ridewatcher(io);
        await driverWatcher(io); 
        console.log("standing on server")
       } catch (error) {
        
       }
    })
})


//routes

import userRouter from './routes/user.routes.js'
import driverRouter from'./routes/driver.routes.js'
import rideRouter from './routes/ride.routes.js'

app.use("/api/v1/users" , userRouter) 


app.use("/api/v1/drivers",  driverRouter)

app.use("/api/v1/ride",rideRouter)
