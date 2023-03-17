const mongoose = require('mongoose');
const { isEmail } = require('validator');

const commentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: [ isEmail, 'Please enter a valid email']
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true});

const comment = mongoose.model('comment', commentSchema);
module.exports = comment;


