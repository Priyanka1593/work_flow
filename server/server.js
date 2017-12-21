const express=require('express');
const path=require('path');
const http=require('http');
const socketIO=require('socket.io');
const publicPath=path.join(__dirname,'../public');
var app=express();
var server=http.createServer(app);
var io=socketIO(server);
var port=process.env.PORT || 3000;
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New User Connected');

    socket.on('disconnect',()=>{
        console.log('Client was Disconnected');
    })
});

server.listen(port,()=>{
    console.log(`connected to port ${port}`);
});