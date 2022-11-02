const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server,{
    cors:{
        origin:'*',
        method: ['GET', 'POST']
    }
})

const users = []

io.on('connection', socket =>{
    console.log('connection made successfully',socket.id)
    socket.on("join", payload => {
        users.push(payload)
        console.log(payload)
        socket.broadcast.emit("new_user", users)
    })
    socket.on('message',payload => {
        console.log('Message received on server: ', payload)
        socket.broadcast.emit('message',payload)
    })
})

server.listen(4000,()=>{
    console.log('I am listening at port: 4000');
})

