require('dotenv').config();

process.env.NODE_ENV_CUSTOM = process.env.NODE_ENV_CUSTOM || 'dev';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const swagger = require('./swagger');
const userRoutes = require('./routes/userRoutes');
const queryRoutes = require('./routes/queryRoutes');
const commentRoutes = require('./routes/commentRoutes');
const adRoutes = require('./routes/adRoutes');
const acRoutes = require('./routes/acRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser, requireSwagger } = require('./midddleware/authmiddleware'); 

// express appx
const app = express();

//users request
app.use(express.json());
app.use(cookieParser());


// import the swagger-ui-express middleware
const swaggerUi = require('swagger-ui-express');


// connect to mongoDb

mongoose
  .connect(process.env.NODE_ENV_CUSTOM == 'dev' ? process.env.DB_URI : process.env.DB_URI_TEST, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen('3016', () => {
    console.log('Server is running on port 3016');
  }))
  .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('styles'));
app.use(express.static('img'));
app.use(express.static('js'));
app.use(express.urlencoded({ extended: true }));

// use morgan
if(process.env.NODE_ENV_CUSTOM !== 'test') {
  app.use(morgan('dev'));
};

// check users
  app.get('*', checkUser);
 
 // blogroutes
  app.use(blogRoutes);
 //query routes
  app.use(queryRoutes);
 //user routes
  app.use(userRoutes);
 //comment routes
  app.use(commentRoutes);
 //adRoutes routes
  app.use(adRoutes);
 //acRoutes routes
  app.use(acRoutes);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/prof-exp', (req,res)=> {
  res.render('prof-exp');
});

app.get('/skills', (req,res)=> {
  res.render('skills');
});

app.get('/portfolio', (req,res)=> {
  res.render('portfolio');
});

app.get('/article', (req,res)=> {
  res.render('article');
});

app.get('/contact', (req,res)=> {
  res.render('contact');
});

app.get('/create', requireSwagger,(req,res)=> {
  res.render('create');
});
app.get('/accounts', requireSwagger,(req,res)=> {
  res.render('accounts');
});
app.get('/edit', requireAuth,(req,res)=> {
  res.render('edit');
});


// Add Swagger
const swaggerDocument = swagger(app);

// set up the middleware to serve the Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 404 page
app.use((req, res) => {
  res.status(404).render('404');
});


module.exports = app
