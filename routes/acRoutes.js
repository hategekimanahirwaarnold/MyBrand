const express = require('express')
const User = require('../models/User');

const acRouter = express.Router();

  acRouter.get('/accounts',(req,res)=> {
    res.render('edit');
  });

module.exports = acRouter;
