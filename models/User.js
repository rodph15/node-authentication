const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:1024
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },
    lastIP:{
        type:String,
        default:'',
        max:1024
    }
});

module.exports = mongoose.model('User', userSchema);