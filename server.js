// console.log("server is startesd..");
// console.log("server is startesd..565");



const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require("cors")

app.use(express.static('public'));

app.use(cors())


io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('message', (data) => {
        io.emit('message', data);
        console.log("message is sent to everyone",data.message);
    });

    socket.on('username enter', (username) => {
        io.emit('username enter', username);
    });

    socket.on('username left', (username) => {
        io.emit('username left', username);
    });


    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});




const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
