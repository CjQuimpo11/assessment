const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: [true, 'Full Name is Required']
    },
    email:{
        type: String,
        required: [true, 'Email is Required']
    },
    password:{
        type:String,
        required:[true, 'Password is required']
    },
    isAdmin:{
        type:Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;