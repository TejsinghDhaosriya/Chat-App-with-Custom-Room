const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io').listen(server);
io.on('connection',(socket)=>{
console.log('socket open')  
socket.on('client_new_msg',(data)=>{
    socket.in(data.room).broadcast.emit('server_new_message',{
        msg: data.msg,
        user:data.name ,
        date : new Date()
   })
   
})
 
socket.on('new_joinee',(data)=>{
    console.log('The message from client ',data)
socket.join(data.room);
socket.in(data.room).broadcast.emit('server_new_joinee',{
     msg: data.name +' succuessfully joined room '+data.room ,
     user:data.name ,
     date : new Date()
})
})
})

server.listen(3000,()=>{
    console.log('server started')
}) 