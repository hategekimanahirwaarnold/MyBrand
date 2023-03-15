const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [ isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter an email'],
        minlength: [4, 'Minimum password length is 4 characters'],
    },
});

const User = mongoose.model('user', userSchema)

module.exports = User;
