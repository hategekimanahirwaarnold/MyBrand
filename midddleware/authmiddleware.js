const jwt = require('jsonwebtoken');
const Adjwt = require('jsonwebtoken');
const User = require('../models/user')
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //check json web token exists & is verified
    if (token) {
       jwt.verify(token, process.env.USECRET, (err, decodedToken) => {
         if (err) {
            const acceptHeader = req.get('Accept');
            if (acceptHeader === 'application/json') {
               return res.sendStatus(401);
            }
            res.redirect('/login');
         } else {
            console.log(decodedToken);
            next()
         }
       })
    }
    else {
        res.redirect('/login');
    }
};

// check current user
const checkUser = (req, res, next) => {
   const token = req.cookies.jwt;

   if (token) {
      jwt.verify(token, process.env.USECRET, async (err, decodedToken) => {
        if (err) {
           console.log(err.message);
           res.locals.user = null;
           next();
        } else {
           console.log(decodedToken);
           let user = await User.findById(decodedToken.id);
           res.locals.user = user;
           next()
        }
      })
   }
   else {
      res.locals.user = null;
      next();
   }
};


const requireSwagger = (req, res, next) => {
   const token = req.cookies.Adjwt;

   //check json web token exists & is verified
   if (token) {
      Adjwt.verify(token, process.env.SECRET, (err, decodedToken) => {
         next()
      })
   } else {
      //  return res.sendStatus(401);
     return res.sendStatus(401);
   }
};

module.exports = { requireAuth, requireSwagger, checkUser };