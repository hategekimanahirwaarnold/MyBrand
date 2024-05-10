const Admin = require('../models/admin');
const Adjwt = require('jsonwebtoken');

//handle errors 
const handleErrors = (err) => {
   console.log(err.message, err.code);
   let errors = { email: '', password: '' }

   // incorrect email
   if (err.message === 'Incorrect email'){
    errors.email = 'that email is not registered';
   }
    // incorrect pass
    if (err.message === 'Incorrect password'){
        errors.email = 'that password is incorrect';
    }


   //duplicate error code 
   if (err.code === 11000){
     errors.email = "that email is already registered";
     return errors;
   }

   //validation errors
   if (err.message.includes('admin validation failed')) {
      Object.values(err.errors).forEach(({properties}) => {
        errors[properties.path] = properties.message;
      });
   }

   return errors;
};
const maxAge = 1 * 24 * 60 * 60;
const createToken = (id) => {
    return Adjwt.sign({ id }, process.env.SECRET, {
        expiresIn: maxAge
    })
};
 
module.exports.adSignup_get = (req, res) => {
    res.render('adSignup');
};

module.exports.adLogin_get = (req, res) => {
    res.render('adLogin');
};

module.exports.adSignup_post = async (req, res) => {
    const { email, password } = req.body;

    try {
       const admin = await Admin.create({ email, password });
       const token = createToken(admin._id);
       res.cookie('Adjwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
       res.status(200).json({ admin: admin._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });

    }
};

module.exports.adLogin_post = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const admin = await Admin.login(email, password);
        const token = createToken(admin._id);
        res.cookie('Adjwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ admin: admin._id })
    }
    catch (err) {
       const errors = handleErrors(err);
       res.status(400).json({ errors });
    }
}
