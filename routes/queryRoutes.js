const express = require('express')
const queryCont = require('../controllers/queryCont');
const Query = require('../models/query');
const mongoose = require('mongoose');
const { requireAuth, requireSwagger } = require('../midddleware/authmiddleware'); 

const Qrouter = express.Router();


// Qrouter.get('/query',(req,res)=> {
//     const acceptHeader = req.get('Accept');
//     if (acceptHeader === 'application/json') {
//     res.render('query');
//     }
// });


Qrouter.route('/query/api')
  .get(requireSwagger, async (req, res) => {
    try {
      const query = await Query.find();
      res.json(query);
    } catch (err) {
      res.status(500).send(err.message);
    }
  })
  .post( async (req, res) => {
    try {
      const query = new Query(req.body);
      const savedQuery = await query.save();
      res.status(201).json(savedQuery);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

Qrouter.route('/query/api/:id')
  .get(requireSwagger, async (req, res) => {
    // Check if id is a valid ObjectId
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(404).render('404');
      return;
    };
    try {
      const query = await Query.findById(req.params.id);
      if (!query) {
        return res.status(404).render('404');
      }
      res.json(query);
    } catch (err) {
      res.status(500).send(err.message);
    }
  })
  .delete(requireSwagger, async (req, res) => {
    try {
      const query = await Query.findByIdAndDelete(req.params.id);
      if (!query) {
        return res.status(404).json({ message: 'Query not found' });
      }
      res.json(query);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

module.exports = Qrouter;


/**
 * @swagger
 * tags:
 *   - name: Queries
 *     description: API for managing Queries
 * components:
 *   schemas:
 *     query:
 *       type: object
 *       required:
 *         - email
 *         - message
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Query post
 *         email:
 *           type: string
 *           description: email of a user
 *         message:
 *           type: string
 *           description: A message to be sent by the user
 *       example:
 *         email: hirwa
 *         message: you are lucky to be called lucky
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


/** 
 * @swagger
 * paths:
 *   /query/api:
 *     get:
 *       summary: Returns a list of Queries
 *       tags: [Queries]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: The list of Queries
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/query'
 *     post:
 *       summary: send a query
 *       tags: [Queries]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/query'
 *       responses:
 *         '201':
 *           description: The Query was successfully sent
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/query'
 *         '404':
 *           description: Bad request. The request was invalid or cannot be served. This includes invalid JSON, missing or invalid parameters, etc.
 */

 /** 
  * @swagger
 * /query/api/{id}:
 *   get:
 *     summary: Returns a single Query by ID
 *     tags: [Queries]
 *     security:
 *         - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Query post to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The requested Query
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/query'
 *       '404':
 *         description: Query post not found'404'
 *       '401':
 *         description: Unauthorized
 *   
 *   delete:
 *     summary: Deletes an existing Query 
 *     tags: [Queries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Query to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The Query was deleted successfully
 *         content:
 *           application/json:  
 *             schema:
 *             $ref: '#/components/schemas/query' 
 *       '404':
 *         description: Query not found
 *       '401':
 *         description: Unauthorized
 */

