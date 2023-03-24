const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();
const { requireAuth, requireSwagger } = require('../midddleware/authmiddleware'); 
const blogCont = require('../controllers/blogCont');
const { verifyToken } = require('../midddleware/adminMiddleware'); 
const multer = require('multer');
const fs = require('fs');

// set up multer storage engine
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const upload = multer({ storage: storage });
  

// swagger crud operations

// get json format of blogs
router.get('/blogs/api', blogCont.getApiBlogs);
// single blog
router.get('/blogs/api/:id',blogCont.singleApiBlog);
// post a new blog using swagger
router.post('/blogs/api', requireSwagger, blogCont.postApiNew);
// Update a blog - using swagger
router.put('/blogs/api/:id', requireSwagger,blogCont.editSwagger);
// Delete a blog
router.delete('/blogs/api/:id', requireSwagger,blogCont.deleteBlog);
//delete a blog's api

// website crud operations

// sort blogs on the manage page
router.get('/manage', requireSwagger, blogCont.manageBlogs);
// render all blogs - both website and swagger
router.get('/blogs', blogCont.getBlogs);
// post a new blog 
router.post('/blogs', requireSwagger, upload.single('image'), blogCont.postNew);
// editing a blog
router.post('/edit/:id', requireSwagger, upload.single('image'), blogCont.findEditBlog);
// post required data before 
router.get('/edit/:id', requireSwagger, blogCont.editBlog);
// direct the user to the article - both website and swagger
router.get('/blogs/:id',blogCont.singleBlog);

/**
 * @swagger
 * tags:
 *   - name: Blogs
 *     description: API for managing blogs
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - body
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the blog post
 *         title:
 *           type: string
 *           description: The title of the blog
 *         description:
 *           type: string
 *           description: A short description of the blog post
 *         body:
 *           type: string
 *           description: The body of the blog post
 *       example:
 *         title: My Journey to software
 *         description: Example of Blog Description
 *         body: Example of Blog Body
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/** 
 * @swagger
 * paths:
 *   /blogs/api:
 *     get:
 *       summary: Returns a list of blogs
 *       tags: [Blogs]
 *       responses:
 *         '200':
 *           description: The list of blogs
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Blog'
 *     post:
 *       summary: Create a new blog post
 *       tags: [Blogs]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       responses:
 *         '201':
 *           description: The blog was successfully created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Blog'
 *         '404':
 *           description: Bad request. The request was invalid or cannot be served. This includes invalid JSON, missing or invalid parameters, etc.
 */

 /** 
  * @swagger
 * /blogs/api/{id}:
 *   get:
 *     summary: Returns a single blog post by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog post to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The requested blog post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '404':
 *         description: Blog post not found
 *   put:
 *     summary: Updates an existing blog post
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog post to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       '200':
 *         description: The updated blog post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '404':
 *         description: Blog post not found
 *   delete:
 *     summary: Deletes an existing blog post
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog post to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The blog post was deleted successfully
 *         content:
 *           application/json:  
 *             schema:
 *             $ref: '#/components/schemas/Blog' 
 *       '404':
 *         description: Blog post not found
 */

 

module.exports = router;
