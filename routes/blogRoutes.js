const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();
const { requireAuth, requireSwagger } = require('../midddleware/authmiddleware'); 
const blogCont = require('../controllers/blogCont');
const { verifyToken } = require('../midddleware/adminMiddleware'); 


// sort blogs on the manage page
router.get('/manage', requireAuth, blogCont.manageBlogs);

// render all blogs - both website and swagger
router.get('/blogs', blogCont.getBlogs);

// post a new blog 
router.post('/blogs', requireSwagger, blogCont.postNew);
// post required data before editing a blog
router.post('/edit/:id', verifyToken, blogCont.findEditBlog);
// edit a blog 
router.get('/edit/:id', verifyToken, blogCont.editBlog);
     
// direct the user to the article - both website and swagger
router.get('/blogs/:id',blogCont.singleBlog);

// swagger crud operations

// Update a blog - using swagger
router.put('/blogs/:id', requireSwagger, blogCont.editSwagger);

// Delete a blog
router.delete('/blogs/:id', requireSwagger, blogCont.deleteBlog)

// Route to generate a JWT for a user
// router.post('/login', (req, res) => {
//     const user = { id: 123, role: 'admin' }; // Replace with the user data that you retrieve from your database
//     const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
//     res.json({ token });
//   });


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
 *   /blogs:
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
 *         '200':
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
 * /blogs/{id}:
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
