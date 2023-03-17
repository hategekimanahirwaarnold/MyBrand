const mongoose = require('mongoose');
const { isEmail } = require('validator');

const querySchema = new mongoose.Schema({
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

const Query = mongoose.model('Query', querySchema);
module.exports = Query;


