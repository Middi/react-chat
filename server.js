var express = require('express');
var socket = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const Message = require('./backend/models/Message');
require('dotenv').config();

var app = express();

const port = 5000;

// Setup for CORS / Accept requests from our client
app.use(cors({
	origin: 'http://localhost:3000'
}));

// Connect to DB
mongoose.connect(process.env.DB)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

io = socket(server);

io.on('connection', (socket) => {
    console.log('socketID: ', socket.id);

    socket.on('SEND_MESSAGE', (data) => {
        new Message(data)
        .save()
        .catch(err => console.log(err));

        io.emit('RECEIVE_MESSAGE', data);
    })
    socket.on('ONLINE', (data) => {
        console.log('usernamed id', socket.id);
        io.emit('USER_ONLINE', data);
    });
});



// Get request
app.get('/', (req, res) => {
    Message.find()
        .then(data => res.json(data))
});