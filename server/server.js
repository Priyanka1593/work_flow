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
   /* socket.emit('newEmail',{
        from:'priya@gmail.com',
        text:'Hi..How r u Kiran?',
        createAt:123
    });*/

    socket.emit('newMessage',{
        from:'Admin',
        text:'Welcome to chat app'
    });

    socket.broadcast.emit('newMessage',{
        from:'Admin',
        text:'New User Joined',
        createdAt:new Date().getTime()
    });

    socket.on('createMessage',(message)=>{
        console.log('createMessage',message);
        io.emit('newMessage',{
            from:message.from,
            text:message.text,
            createdAt:new Date().getTime()
        });
        socket.on('responseMessage',function(res){
            console.log('responseMessage',res);
        });

    })
    socket.on('disconnect',()=>{
        console.log('Client was Disconnected');
    })
});

server.listen(port,()=>{
    console.log(`connected to port ${port}`);
});