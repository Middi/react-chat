const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    }
})

module.exports = Message = mongoose.model('messages', MessageSchema);