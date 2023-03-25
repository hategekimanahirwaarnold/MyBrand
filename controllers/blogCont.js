const Blog = require('../models/blog');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const User = require('../models/user');



cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.CLOUD_KEY,
   api_secret: process.env.CLOUD_SECRET
});

function formatInputDate(dateInput) {
   // Convert the date input string to a Date object
   var dateObj = new Date(dateInput);
   
   // Get the formatted date string in the user's locale
   const formattedDate = dateObj.toLocaleDateString("en-us", {
       year: "numeric",
       month: "long",
       day: "numeric",
   });
   return formattedDate;
 };

const storage = multer.diskStorage({
   destination: function(req, file, cb) {
     cb(null, 'uploads/');
   },
   filename: function(req, file, cb) {
     cb(null, Date.now() + '-' + file.originalname);
   }
 });
 const upload = multer({ storage: storage });
 

// post a new blog 
module.exports.postNew = async (req, res) => {
   try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const blog = new Blog({
        title: req.body.title,
        description: req.body.description,
        body: req.body.body,
        image: result.secure_url,
        date:  formatInputDate(req.body.date)
      });
      blog.save()
      .then((result) => {
         console.log(blog);
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
   } catch(err) {
      console.log(err)
   };
};

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
 // get blogs in json format/api
 module.exports.getApiBlogs = (req,res) => {
   Blog.find().sort({ createdAt: -1 })
   .then((result) => {
       res.json(result);
   })
   .catch((err) => {
     console.log(err);
   });
};

// post new api blog
module.exports.postApiNew = (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
      .then((result) => {
            res.status(201).json(result);
      })
      .catch ((err) => {
            console.log(err);
            res.status(404).json();
      });
};

//relocate to where admin can edit a blog on admin portal
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

// edit a blog
 module.exports.findEditBlog = async (req, res) => {
   try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const id = req.params.id;
      const update = ({
        title: req.body.title,
        description: req.body.description,
        body: req.body.body,
        image: result.secure_url,
        date:  formatInputDate(req.body.date)
      })
      Blog.findByIdAndUpdate(id, update, { new: true})
       .then(result => {
           res.redirect('/manage')
       })
       .catch (err => {
          console.log(err);
       });
   } catch (err) {
      console.log(err);
   }

};
// single blog
module.exports.singleBlog = (req, res) => {
   const id = req.params.id;
   // Check if id is a valid ObjectId
   if (!mongoose.isValidObjectId(id)) {
      res.status(404).render('404');
      return;
   };
   Blog.findById(id)
     .then(result => {
       if (!result) {
         res.status(404).render('404');
         return;
       }
       res.render('article', { blog: result });
     })
     .catch(err => {
       console.log(err);
       res.status(500).send('Internal Server Error');
     });
 };

// single blog api
 module.exports.singleApiBlog = (req, res) => {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      res.status(404).render('404');
      return;
   };
    Blog.findById(id)
      .then(result => {
         if(!result) {
            res.status(404);
         }
         res.json(result);
      })
      .catch( err => {
       var acceptHeader = req.get('Accept');
          if (acceptHeader === 'application/json'){
          console.log(err);
          res.status(404).json( );
          res.render('404');
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
              res.status(200).json({ message: 'Blog deleted successfully' });
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