const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema 
const UserSchema = new Schema({
    name:{
        type: String,
    },
    email: {
        type: String
    },
    mobile:{
        type: String
    },
    certino:{
        type: String,
        required: true
    }
    
});

const User = mongoose.model('user',UserSchema);
module.exports = User;