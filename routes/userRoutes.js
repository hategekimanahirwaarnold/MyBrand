const express = require('express')
const authCont = require('../controllers/authCont.js');
const urouter = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { requireAuth, requireSwagger } = require('../midddleware/authmiddleware'); 

urouter.get('/signup', authCont.signup_get);
urouter.post('/signup', authCont.signup_post);
urouter.get('/login', authCont.login_get);
urouter.post('/login', authCont.login_post);
urouter.get('/logout', authCont.logout_get);
urouter.get('/accounts', authCont.getAllUsers);


  const maxAge = 7 * 24 * 60 * 60;
  const createToken = (id) => {
      return jwt.sign({ id }, process.env.USECRET, {
          expiresIn: maxAge
      })
  };
 
 const handleErrors = (err) => {
    let errors = { email: '', password: '' };
  
    if (err.message.includes('user validation failed')) {
      // Validation errors
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    } else if (err.code === 11000) {
      // Duplicate key error
      errors.email = 'that email is already registered';
    } else if (err.message === 'Incorrect email') {
      // Incorrect email error
      errors.email = 'that email is not registered';
    } else if (err.message === 'Incorrect password') {
      // Incorrect password error
      errors.password = 'that password is incorrect';
    } else {
      // Unknown error
      console.error(err);
      errors.email = 'Something went wrong';
    }
  
    return errors;
  };
  
 

urouter.get('/Users', requireSwagger, async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      const errors = handleErrors(error);
      res.status(400).json({ errors });
    }
  });
  
  urouter.post('/Users', async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(201).json(user);
    } catch (error) {
      const errors = handleErrors(error);
      res.status(404).json({ errors });
    }
  });
// Get a single user by ID
  urouter.get('/Users/:id', requireSwagger, async (req, res) => {

     // Check if id is a valid ObjectId
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(404).render('404');
      return;
    };
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  // Delete an existing user
   urouter.delete('/Users/:id', requireSwagger, async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
     } catch (err) {
      res.status(500).send('Server Error');
    }
  });
  
module.exports = urouter;

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: API for managing Users
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the User
 *         email:
 *           type: string
 *           description: The title of the User
 *         password:
 *           type: string
 *           description: A short description of the User
 *       example:
 *         email: hirwa@gmail.com
 *         password: 123kh3i2h4kh
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


/** 
 * @swagger
 * paths:
 *   /Users:
 *     get:
 *       summary: Returns a list of Users
 *       tags: [Users]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: The list of Users
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/User'
 *     post:
 *       summary: Sign up
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         '200':
 *           description: The User was successfully created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         '404':
 *           description: Bad request. The request was invalid or cannot be served. This includes invalid JSON, missing or invalid parameters, etc.
 */

 /** 
  * @swagger
 * /Users/{id}:
 *   get:
 *     summary: Returns a single User by ID
 *     tags: [Users]
 *     security:
 *         - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the User to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The requested User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found'404'
 *       '401':
 *         description: Unauthorized
 *   delete:
 *     summary: Deletes an existing User 
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the User to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The User was deleted successfully
 *         content:
 *           application/json:  
 *             schema:
 *             $ref: '#/components/schemas/User' 
 *       '404':
 *         description: User not found
 */

/**
 * @swagger
 *  /login:
 *   post:
 *     summary: Logs in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               password:
 *                 type: string
 *                 description: The user's password
 *             example:
 *               email: john@example.com
 *               password: password123
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                   description: The ID of the logged in user
 *                   example: 61568b47695cfb16f8d21e7e
 *       '400':
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   description: Object containing validation errors
 *                   properties:
 *                     email:
 *                       type: string
 *                       description: Error message for invalid email
 *                       example: that email is not registered
 *                     password:
 *                       type: string
 *                       description: Error message for invalid password
 *                       example: that password is incorrect
 */
