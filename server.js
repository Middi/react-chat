var express = require('express');
var socket = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const Message = require('./backend/models/Message');
const User = require('./backend/models/Users');
require('dotenv').config();


const port = 5000;

var app = express();

var server = require('http').Server(app)
var io = socket(server);

// Setup for CORS / Accept requests from our client
app.use(cors({
	origin: 'http://localhost:3000'
}));

// Connect to DB
mongoose.connect(process.env.DB)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

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
        const user = {
            username: data.user,
            socketId: socket.id
        }
        
        User.findOne({username: user.username})
            .then( (res) => {
                if(res) {
                    console.log('username taken')
                    io.emit('USER_TAKEN', res);
                }
                else {
                new User(user)
                    .save()
                    .then(() => io.emit('USER_ONLINE', user.username))
                    .catch(err => console.log(err));
                }
            });
    });

    socket.on('disconnect', () => {

        User.findOneAndRemove({ socketId: socket.id }, (err) => {
            if (err)
                console.log(err);
            else
                console.log('User Deleted!');
        });

      
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});



// Get request
app.get('/messages', (req, res) => {
    Message.find()
        .then(data => res.json(data));
});

app.get('/users', (req, res) => {
    User.find()
        .then(data => res.json(data));
});

