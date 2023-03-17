const Blog = require('../models/blog');

// sort blogs on the manage page
module.exports.manageBlogs = (req,res)=> {
    Blog.find().sort({ createdAt: -1 })
      .then((result) => {
        res.render('manage', {blogs: result });
      })
      .catch((err) => {
         console.log(err)
      }); 
 };
// get a list of blogs on website and swagger
module.exports.getBlogs = (req,res) => {
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
 };
 
// post a new blog 
module.exports.postNew = (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
      .then((result) => {
         const acceptHeader = req.get('Accept');
         if (acceptHeader === 'application/json') {
            console.log('Done');
            res.status(200).json(result);
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
};
//edit a blog on admin portal
module.exports.editBlog = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then(result => {
         const acceptHeader = req.get('Accept');
         if (acceptHeader === 'application/json') {
            if (result) {
              res.json(result);
            } else {
              res.status(404).json();
            }
         } else {
            res.render('edit', { blog: result })
         }
      })
      .catch( err => {
         console.log(err)
      });
 };
 module.exports.findEditBlog = (req, res) => {
    const id = req.params.id;
    const update = req.body;
    Blog.findByIdAndUpdate(id, update, { new: true})
     .then(result => {
         res.redirect('/manage')
     })
     .catch (err => {
        console.log(err);
     });
};
// single blog
module.exports.singleBlog = (req, res) => {
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
          res.status(404).json( );
          } else {
             console.log(err)
          }
      });
 };
// edit a blog on swagger 
module.exports.editSwagger = (req, res) => {
    const id = req.params.id;
    const update = req.body;
    Blog.findByIdAndUpdate(id, update, { new: true})
     .then(result => {
         if (result) {
           res.json(result);
         } else {
           res.status(404).json();
         }
     })
     .catch (err => {
        console.log(err);
        res.status(404).json( );
     });
  };
 // delete a blog 
 module.exports.deleteBlog = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
      .then(result => {
        const acceptHeader = req.get('Accept');
        if (acceptHeader === 'application/json') {
           if (result) {
              res.json({ message: 'Blog deleted successfully' });
           } else {
              res.status(404).json();
           }
           } else {
              res.json({ redirect: '/manage' })
           }
        })
      .catch( err => {
        console.log(err);
        res.status(404).json();
      });
  };