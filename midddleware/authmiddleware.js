const jwt = require('jsonwebtoken');
const Adjwt = require('jsonwebtoken');

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

module.exports = { requireAuth, requireSwagger };