const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


const adSchema = new mongoose.Schema({
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

// fire a function after doc saved to db
adSchema.post('save', function(doc, next) {
    console.log('new admin was created and saved', doc);

    next();
})

// fire a function before doc saved to db
adSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static model to login admin
adSchema.statics.login = async function(email, password) {
    const admin = await this.findOne({ email });
    if (admin) {
      const auth = await bcrypt.compare(password, admin.password);
      if (auth) {
        return admin;
      }
       throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
}

const admin = mongoose.model('admin', adSchema)

module.exports = admin;
