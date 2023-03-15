const express = require('express')
const authCont = require('../controllers/authCont.js');

const urouter = express.Router();

urouter.get('/signup', authCont.signup_get);
urouter.post('/signup', authCont.signup_post);
urouter.get('/login', authCont.login_get);
urouter.post('/login', authCont.login_post);

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
 *         - name
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the User post
 *         title:
 *           type: string
 *           description: The title of the User
 *         description:
 *           type: string
 *           description: A short description of the User post
 *         body:
 *           type: string
 *           description: The body of the User post
 *       example:
 *         title: My Journey to software
 *         description: Example of User Description
 *         body: Example of User Body
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
 *       summary: Create a new User post
 *       tags: [Users]
 *       security:
 *         - bearerAuth: []
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
 *     summary: Returns a single User post by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the User post to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The requested User post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User post not found
 *   put:
 *     summary: Updates an existing User post
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the User post to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: The updated User post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User post not found
 *   delete:
 *     summary: Deletes an existing User post
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the User post to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The User post was deleted successfully
 *         content:
 *           application/json:  
 *             schema:
 *             $ref: '#/components/schemas/User' 
 *       '404':
 *         description: User post not found
 */

