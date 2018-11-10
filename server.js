var express = require('express');
var socket = require('socket.io');

var app = express();

const port = 5000;


server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

io = socket(server);

io.on('connection', (socket) => {
    console.log('socketID: ', socket.id);

    socket.on('SEND_MESSAGE', (data) => {
        io.emit('RECEIVE_MESSAGE', data);
    })
});