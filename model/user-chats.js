const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://The-Deens-Connect:ZhoXICZ3ah7pIaGy@all-data.ldbkbgx.mongodb.net/?retryWrites=true&w=majority");

let schema = mongoose.Schema(
    [{
        chatter: String,
        messages: [{
            sender: String,
            message_sent: String
        }]
    }]
);

module.exports = mongoose.model("usersChatsPersonal", schema);