const express=require('express')
const app=express();
const cors=require("cors")
require("dotenv").config()
const {createServer} =require("http");
const myHttpServer=createServer(app);

const {Server}=require("socket.io");

const io=new Server(myHttpServer,{
    cors:{
        origin:"*"
    }
})
// app.use(cors())

let users=[];
let activeUsers=0;

io.on("connection",(socket)=>{
    console.log(`user connected ${socket.id}`)
    
    socket.on("enter",(data)=>{
        users[socket.id]=data.userName;
        activeUsers++;
        console.log(activeUsers);

        io.emit("update",activeUsers);
        socket.broadcast.emit("notify",data.userName+" has joined chats")
        setTimeout(()=>{
            io.emit("notify","");

        },3000)
        
    })
    socket.on("send",(msg)=>{
        console.log(msg);
        io.emit("recieve",msg);
        
    })

  
    socket.on("disconnect",()=>{
        activeUsers--;
        io.emit("notify",users[socket.id]+ " has left chats");
        setTimeout(()=>{
            io.emit("notify","");

        },3000)
        
    })
})




const port=process.env.PORT||500
myHttpServer.listen(port,()=>{
    console.log(`server running at port ${port}`)
})
    