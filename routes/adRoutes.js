const express = require('express')
const adCont = require('../controllers/adCont');

const adRouter = express.Router();

adRouter.get('/adSignup', adCont.adSignup_get);
adRouter.post('/adSignup', adCont.adSignup_post);
adRouter.get('/adLogin', adCont.adLogin_get);
adRouter.post('/adLogin', adCont.adLogin_post);

module.exports = adRouter;