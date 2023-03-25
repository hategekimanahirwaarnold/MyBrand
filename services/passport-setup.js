const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

 const maxAge = 7 * 24 * 60 * 60;
   const createToken = (id) => {
       return jwt.sign({ id }, process.env.USECRET, {
           expiresIn: maxAge
       })
 };


  passport.serializeUser((user, done) => {
      done(null, user.id); 
  });

  passport.deserializeUser((id, done) => {
      User.findById(id).then((user) => {
          done(null, user);
      })
  });

const callbackURL = process.env.NODE_ENV === 'production' ? 'https://hirwa-arnold.cyclic.app/auth/google/redirect' : 'http://localhost:3016/auth/google/redirect';

// modify your passport.use() callback function
passport.use(new GoogleStrategy({
  //options for the google strat
  callbackURL: callbackURL,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
}, (res, accessToken, refreshToken, profile, done) => {
  //Check if use exist in the data base
  User.findOne({ email: profile.emails[0].value })
  .then((currentUser) => {
    if (currentUser) {
      console.log('User is' + currentUser);
      done(null, currentUser);
    } else {
      // create a new user in db
      new User({
        email: profile.emails[0].value,
        password: profile.id
      }).save().then((newUser) => {
        console.log('new user created' + newUser);
        done(null, newUser);
      });
    }
  });
}));
