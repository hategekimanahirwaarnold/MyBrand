const express = require('express');
const Comment = require('../models/comment');
const commentCont = require('../controllers/commentCont');
const mongoose = require('mongoose');
const { requireAuth, requireSwagger } = require('../midddleware/authmiddleware'); 

const Crouter = express.Router();

Crouter.route('/Comments')
  .get(requireSwagger, async (req, res) => {
    try {
      const comments = await Comment.find();
      res.json(comments);
    } catch (err) {
      res.status(500).send(err.message);
    }
  })
  .post( async (req, res) => {
    try {
      const comment = new Comment(req.body);
      const savedComment = await comment.save();
      res.status(201).json(savedComment);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

Crouter.route('/Comments/:id')

  .get(requireSwagger, async (req, res) => {

    // Check if id is a valid ObjectId
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(404).render('404');
      return;
    };
    try {
      const comment = await Comment.findById(req.params.id);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.json(comment);
    } catch (err) {
      res.status(500).send(err.message);
    }
  })
  .delete(requireSwagger, async (req, res) => {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.id);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.json(comment);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

module.exports = Crouter

/**
 * @swagger
 * tags:
 *   - name: Comments
 *     description: API for managing Comments
 * components:
 *   schemas:
 *     comment:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - comment
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the comment
 *         name:
 *           type: string
 *           description: name of a user
 *         comment:
 *           type: string
 *           description: A comment to be sent by the user
 *       example:
 *         id: 13jkhk2h34jljk32jh2l3
 *         name: hirwa
 *         comment: you are lucky to be called lucky
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


/** 
 * @swagger
 * paths:
 *   /Comments:
 *     get:
 *       summary: Returns a list of Comments
 *       tags: [Comments]
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         '200':
 *           description: The list of Comments
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/comment'
 *     post:
 *       summary: send a comment
 *       tags: [Comments]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/comment'
 *       responses:
 *         '201':
 *           description: The comment was successfully sent
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/comment'
 *         '404':
 *           description: Bad request. The request was invalid or cannot be served. This includes invalid JSON, missing or invalid parameters, etc.
 */

 /** 
  * @swagger
 * /Comments/{id}:
 *   get:
 *     summary: Returns a single comment by ID
 *     tags: [Comments]
 *     security:
 *         - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the comment post to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The requested comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/comment'
 *       '404':
 *         description: comment post not found'404'
 *       '401':
 *         description: Unauthorized
 *   
 *   delete:
 *     summary: Deletes an existing comment 
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the comment to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The comment was deleted successfully
 *         content:
 *           application/json:  
 *             schema:
 *             $ref: '#/components/schemas/comment' 
 *       '404':
 *         description: comment not found
 *       '401':
 *         description: Unauthorized
 */

