const User = require('../models/User');

//handle errors 
const handleErrors = (err) => {
   console.log(err.message, err.code);
   let error = { email: '', password: '' }

   //validation errors
   if (err.message.includes('user validation failed')) {
      console.log(err);
   }
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;

    try {
       const user = await User.create({ email, password });
       res.status(201).json(user);
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).send('error, user not created');

    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    console.log (email, password)
    res.send('user login');
}