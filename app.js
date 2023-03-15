const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const swagger = require('./swagger');
const userRoutes = require('./routes/userRoutes')

// express appx
const app = express();

//users request
app.use(express.json());




// import the swagger-ui-express middleware
const swaggerUi = require('swagger-ui-express');

// connect to mongoDb
const dbURI = 'mongodb+srv://hirwa:arn01dbeHate@mybrand.yccl4uy.mongodb.net/my-brand?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen('3016'))
  .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('styles'));
app.use(express.static('img'));
app.use(express.static('js'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// blog routes
app.use(blogRoutes);

//user routes
app.use(userRoutes);

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

app.get('/create', (req,res)=> {
  res.render('create');
});

app.get('/edit', (req,res)=> {
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