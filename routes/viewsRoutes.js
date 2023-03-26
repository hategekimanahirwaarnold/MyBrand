const express = require('express')
const { requireAuth, requireSwagger } = require('../midddleware/authmiddleware'); 

const viewsRouter = express.Router();

module.exports = viewsRouter;