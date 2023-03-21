const express = require('express')
const User = require('../models/user');

const acRouter = express.Router();

  acRouter.get('/accounts',(req,res)=> {
    res.render('edit');
  });

module.exports = acRouter;
