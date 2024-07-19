const { required } = require('joi');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema ({
    firstName : {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    isVerified: { type: Boolean, default: false },
    verificationCode: {
        type: String
    }
});

module.exports = mongoose.model('user', userSchema);