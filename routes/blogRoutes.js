const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();

router.get('/blogs', (req,res) => {
    Blog.find().sort({ createdAt: -1 })
      .then((result) => {
        res.render('blogs', {blogs: result });
      })
      .catch((err) => {
         console.log(err)
      }); 
});

// post a new blog
router.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
      .then((result) => {
         console.log('Done');
         res.redirect('/manage')
      })
      .catch ((err) => {
        console.log(err)
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
     
// direct the user to the article
router.get('/blogs/:id', (req, res) => {
   const id = req.params.id;
   Blog.findById(id)
     .then(result => {
        res.render('article', { blog: result })
     })
     .catch( err => {
        console.log(err)
     });
});
router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then(result => {
         res.render('edit', { blog: result })
      })
      .catch( err => {
         console.log(err)
      });
 });

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
//delete blogs
router.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
      .then(result => {
         res.json({ redirect: '/manage' })
      })
      .catch( err => {
        console.log(err);
      })
});

module.exports = router;