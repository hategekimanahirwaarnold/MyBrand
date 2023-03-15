const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();

// sort blogs on the manage page
router.get('/manage', (req,res)=> {
   Blog.find().sort({ createdAt: -1 })
     .then((result) => {
       res.render('manage', {blogs: result });
     })
     .catch((err) => {
        console.log(err)
     }); 
});

// render all blogs - both website and swagger
router.get('/blogs', (req,res) => {
   Blog.find().sort({ createdAt: -1 })
   .then((result) => {
     const acceptHeader = req.get('Accept');
     if (acceptHeader === 'application/json') {
       res.json(result);
     } else {
       res.render('blogs', { blogs: result });
     }
   })
   .catch((err) => {
     console.log(err);
   });
});

// post a new blog 
router.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
      .then((result) => {
         const acceptHeader = req.get('Accept');
         if (acceptHeader === 'application/json') {
            console.log('Done');
            res.status(201).json(result);
         } else {
            console.log('Done');
            res.redirect('/manage')
         }
      })
      .catch ((err) => {
         const acceptHeader = req.get('Accept');
         if (acceptHeader === 'application/json') {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
         } else {
            console.log(err)}
      });
});
//edit a blog
router.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const update = req.body;
    Blog.findByIdAndUpdate(id, update, { new: true})
     .then(result => {
         res.redirect('/manage')
     })
     .catch (err => {
        console.log(err);
     });
});
     
// direct the user to the article - both website and swagger
router.get('/blogs/:id', (req, res) => {
   const id = req.params.id;
   Blog.findById(id)
     .then(result => {
      var acceptHeader = req.get('Accept');
      if (acceptHeader === 'application/json') {
         if (result) {
               res.json(result);
            }
         } else {
            res.render('article', { blog: result })
         }
      })
     .catch( err => {
      var acceptHeader = req.get('Accept');
         if (acceptHeader === 'application/json'){
         console.log(err);
         res.status(404).json({ error: 'Blog post not found!' });
         } else {
            console.log(err)
         }
     });
});
// edit a blog 
router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then(result => {
         const acceptHeader = req.get('Accept');
         if (acceptHeader === 'application/json') {
            if (result) {
              res.json(result);
            } else {
              res.status(404).json({ error: 'Blog not found' });
            }
         } else {
            res.render('edit', { blog: result })
         }
      })
      .catch( err => {
         console.log(err)
      });
 });

// swagger crud operations

// Update a blog - working
router.put('/blogs/:id', (req, res) => {
   const id = req.params.id;
   const update = req.body;
   Blog.findByIdAndUpdate(id, update, { new: true})
    .then(result => {
        if (result) {
          res.json(result);
        } else {
          res.status(404).json({ error: 'Blog not found' });
        }
    })
    .catch (err => {
       console.log(err);
       res.status(500).json({ error: 'Internal server error' });
    });
 });

// Get all blogs
router.get('/api/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
       console.log(err);
       res.status(500).json({ error: 'Internal server error' });
    }); 
});

// Get a specific blog
router.get('/api/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      
    })
    .catch( err => {
    });
});

// create a new blog
router.post('/blogs', (req, res) => {
   const blog = new Blog(req.body);

   blog.save()
       .then((result) => {
           console.log('Done');
           res.status(201).json({ message: 'Blog created successfully' });
       })
       .catch((err) => {
           console.log(err)
           res.status(500).json({ error: err });
       });
});



// Delete a blog
router.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      const acceptHeader = req.get('Accept');
      if (acceptHeader === 'application/json') {
         if (result) {
            res.json({ message: 'Blog deleted successfully' });
         } else {
            res.status(404).json({ error: 'Blog not found' });
         }
         } else {
            res.json({ redirect: '/manage' })
         }
      })
    .catch( err => {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    });
})





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
