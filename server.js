const express=require('express')
const app=express();
const cors=require("cors")

const {createServer} =require("http");
const myHttpServer=createServer(app);

const {Server}=require("socket.io");

const io=new Server(myHttpServer,{
    cors:{
        origin:"*"
    }
})

let users=[];

io.on("connection",(socket)=>{
    console.log(`user connected ${socket.id}`)
    io.emit("notify","new user connected")
    socket.on("send",(msg)=>{
        console.log(msg);
        io.emit("recieve",msg);
        
    })

  
    socket.on("disconnect",()=>{
        console.log(users[socket.id] +" left the chat")
        io.emit("notify","some user disconnected");
        
    })
})




myHttpServer.listen(3000,()=>{
    console.log("running at 3000")
})
    