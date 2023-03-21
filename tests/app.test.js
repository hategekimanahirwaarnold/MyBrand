process.env.NODE_ENV_CUSTOM = 'test';

const request = require('supertest');
const app = require('../app');

// create a new blob
const newBlog = {
   title: 'Test blog',
   description: 'Test description',
   body: 'Test body',
};
const createResponse = await request(app)
   .post('/blogs/api')
   .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
   .send(newBlog);
const blogid = createResponse.body._id;

// Create a new user
const newUser = {
   email: 'usera@gmail.com',
   password: 'made user'
};
const createUser = await request(app)
   .post('/users')
   .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
   .send(newUser);
const userId = createUser.body._id;

 // Create a new comment
 const newComment= {
   email: 'usera@gmail.com',
   message: 'made comment'
};
const createComment = await request(app)
   .post('/comments')
   .send(newComment);
const commentId = createComment.body._id;

  // Create a new query
  const newquery = {
   email: 'usera@gmail.com',
   message: 'made query'
};
const createQuery = await request(app)
   .post('/query/api')
   .send(newquery);
const queryId = createQuery.body._id;


//beginning of tests
describe('Blogs API', () => {
   it('GET /blogs/api --> array blogs', () => {
      return request(app)
         .get('/blogs/api')
         .expect('Content-Type', /json/)
         .expect(200)
         .then((response) => {
            expect(response.body).toEqual(expect.arrayContaining([
               expect.objectContaining({
                  title: expect.any(String),
                  description: expect.any(String),
                  body: expect.any(String),
               }),
            ])
            );
         });
   }, 25000);
// single blog
   it('GET /blogs/api/id --> specific blog by ID', () => {
      return request(app)
         .get(`/blogs/api/${blogid}`)
         .expect('Content-Type', /json/)
         .expect(200)
         .then((response) => {
            expect(response.body).toEqual(
               expect.objectContaining({
                  title: expect.any(String),
                  description: expect.any(String),
                  body: expect.any(String),
               }),
            );
         });
   }, 6000);


   it('GET /blogs/api/id --> 404 if not found', () => {
      return request(app).get('/blogs/api/33333').expect(404);
   });
 
   it('POST /blogs/api --> create a blog', () => {
      return request(app)
      .post('/blogs/api')
      .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
      .send({
         title: 'to test new blog created',
         description: 'made desc',
         body: 'made body',
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
         expect(response.body).toEqual(
            expect.objectContaining({
            title: 'to test new blog created',
            description: 'made desc',
            body: 'made body',
            })
         );
      });
   });

    it('UPDATE /blogs/api/id --> edit a blogs',() => {
      return request(app).put(`/blogs/api/${blogid}`)
      .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
      .send({
         title: 'blog updated',
         description: 'made it desc',
         body: 'made body',
      })
      .expect('Content-Type', /json/).expect(200)
      .then((response) => {
         expect(response.body).toEqual(
            expect.objectContaining({
               title: 'blog updated',
               description: 'made it desc',
               body: 'made body',
            }),
         );
      });
   });

   it('DELETE /blogs/api/:id --> delete a blog', async () => {
      // Create a new blog
      const newBlog = {
         title: 'Test blog',
         description: 'Test description',
         body: 'Test body',
      };
      const createResponse = await request(app)
         .post('/blogs/api')
         .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
         .send(newBlog);
      const blogId = createResponse.body._id;
      
      // Delete the blog
      const deleteResponse = await request(app)
         .delete(`/blogs/api/${blogId}`)
         .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
         //expect(deleteResponse.status).toBe(200);
   
      // Try to get the deleted blog and expect a 404 error
      const getResponse = await request(app)
         .get(`/blogs/api/${blogId}`);
         expect(getResponse.status).toBe(404);
   }, 10000);

});

describe('Users API', () => {
   it('GET /users --> array blogs', () => {
      return request(app)
         .get('/users')
         .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
         .expect('Content-Type', /json/)
         .expect(200)
         .then((response) => {
            expect(response.body).toEqual(expect.arrayContaining([
               expect.objectContaining({
                  email: expect.any(String),
                  password: expect.any(String)
               }),
            ])
            );
         });
   }, 23000);


   it('GET /users/id --> specific user by ID', () => {
      return request(app)
         .get(`/users/${userId}`)
         .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
         .expect('Content-Type', /json/)
         .expect(200)
         .then((response) => {
            expect(response.body).toEqual(
               expect.objectContaining({
                  password: expect.any(String),
                  email: expect.any(String)
               }),
            );
         });
   }, 6000);


   it('GET /users/id --> 404 if not found', () => {
      return request(app)
      .get('/users/33333').expect(404)
      .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
   });

   // it('POST /users --> create a user', () => {
   //    return request(app).post('/users').send({
   //       email: '45usqer@gmail.com',
   //       password: 'made pass'
   //    })
   // // .expect('Content-Type', /json/)
   //    .expect(201)
   //    .then((response) => {
   //       expect(response.body).toEqual(
   //          expect.objectContaining({
   //             email: '45usqer@gmail.com'
   //          }),
   //       );
   //    });
   // });


   it('DELETE /users/:id --> delete a user', async () => {
      // Delete the user
      const deleteResponse = await request(app)
         .delete(`/users/${userId}`)
         .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
   
      // Try to get the deleted user and expect a 404 error
      const getResponse = await request(app)
         .get(`/users/${userId}`)
         .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
         expect(getResponse.status).toBe(404);
   }, 10000);

})



describe('comments API', () => {
   it('GET /comments --> array comments', () => {
      return request(app)
         .get('/comments')
         .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
         .expect('Content-Type', /json/)
         .expect(200)
         .then((response) => {
            expect(response.body).toEqual(expect.arrayContaining([
               expect.objectContaining({
                  email: expect.any(String),
                  message: expect.any(String)
               }),
            ])
            );
         });
   }, 23000);


   it('GET /comments/id --> specific comment by ID', () => {
      return request(app)
         .get(`/comments/${commentId}`)
         .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
         .expect('Content-Type', /json/)
         .expect(200)
         .then((response) => {
            expect(response.body).toEqual(
               expect.objectContaining({
                  message: expect.any(String),
                  email: expect.any(String)
               }),
            );
         });
   }, 6000);


   it('GET /Comments/id --> 404 if not found', () => {
      return request(app)
      .get('/comments/33333')
      .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
      .expect(404);
   });

   it('POST /comments --> create a comment', () => {
      return request(app).post('/comments').send({
         email: '45usqer@gmail.com',
         message: 'made pass'
      })
     // .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
         expect(response.body).toEqual(
            expect.objectContaining({
               email: '45usqer@gmail.com',
               message: 'made pass'
            }),
         );
      });
   });


   it('DELETE /comments/:id --> delete a user', async () => {
     
      // Delete the comment
      const deleteResponse = await request(app)
         .delete(`/comments/${commentId}`)
         .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
   
      // Try to get the deleted a comment and expect a 404 error
      const getResponse = await request(app)
         .get(`/comments/${commentId}`)
         .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
         expect(getResponse.status).toBe(404);
   }, 10000);

});


describe('Query API', () => {
   it('GET /query --> array queries', () => {
      return request(app)
         .get('/query/api')
         .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
         .expect('Content-Type', /json/)
         .expect(200)
         .then((response) => {
            expect(response.body).toEqual(expect.arrayContaining([
               expect.objectContaining({
                  email: expect.any(String),
                  message: expect.any(String)
               }),
            ])
            );
         });
   }, 23000);


   it('GET /query/api/id --> specific query by ID', () => {
      return request(app)
         .get(`/query/api/${queryId}`)
         .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
         .expect('Content-Type', /json/)
         .expect(200)
         .then((response) => {
            expect(response.body).toEqual(
               expect.objectContaining({
                  message: expect.any(String),
                  email: expect.any(String)
               }),
            );
         });
   }, 6000);


   it('GET /query/api/id --> 404 if not found', () => {
      return request(app)
      .get('/query/api/33333')
      .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
      .expect(404);
   });

   it('POST /query/api --> create a query', () => {
      return request(app).post('/query/api').send({
         email: '45usqer@gmail.com',
         message: 'made query'
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
         expect(response.body).toEqual(
            expect.objectContaining({
               email: '45usqer@gmail.com',
               message: 'made query'
            }),
         );
      });
   });


   it('DELETE /query/api/:id --> delete a query', async () => {
    
      // Delete the blog
      const deleteResponse = await request(app)
         .delete(`/query/api/${queryId}`)
         .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
   
      // Try to get the deleted blog and expect a 404 error
      const getResponse = await request(app)
         .get(`/query/api/${queryId}`)
         .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
         expect(getResponse.status).toBe(404);
   }, 10000);

})





