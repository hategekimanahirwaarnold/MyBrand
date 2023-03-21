const express = require('express')
const User = require('../models/user');
const { requireAuth, requireSwagger } = require('../midddleware/authmiddleware'); 

const acRouter = express.Router();

  acRouter.get('/accounts',requireSwagger, (req,res)=> {
    res.render('edit');
  });

module.exports = acRouter;
