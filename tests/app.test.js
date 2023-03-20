const request = require('supertest');
const app = require('../app');


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


   it('GET /blogs/api/id --> specific blog by ID', () => {
      return request(app)
         .get('/blogs/api/6417fb0c8c17d977e684c2f2')
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
      return request(app).post('/blogs/api').send({
         title: 'blog created',
         description: 'made desc',
         body: 'made body',
      })
      .expect('Content-Type', /json/).expect(201)
      .then((response) => {
         expect(response.body).toEqual(
            expect.objectContaining({
               title: 'blog created',
               description: 'made desc',
               body: 'made body',
            }),
         );
      });
   });

    it('UPDATE /blogs/api/id --> edit a blogs',() => {
      return request(app).put('/blogs/api/641858736fa8bb3597302117').send({
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
         .send(newBlog);
      const blogId = createResponse.body._id;
   
      // Delete the blog
      const deleteResponse = await request(app)
         .delete(`/blogs/api/${blogId}`);
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


   it('GET /users/id --> specific blog by ID', () => {
      return request(app)
         .get('/users/64131748a4ff5160f961645e')
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
      return request(app).get('/users/33333').expect(404);
   });

   // it('POST /users --> create a user', () => {
   //    return request(app).post('/users').send({
   //       email: '45usqer@gmail.com',
   //       password: 'made pass'
   //    })
   //   // .expect('Content-Type', /json/)
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
      // Create a new blog
      const newUser = {
         email: 'usera@gmail.com',
         password: 'made user'
      };
      const createResponse = await request(app)
         .post('/users')
         .send(newUser);
      const userId = createResponse.body._id;
   
      // Delete the blog
      const deleteResponse = await request(app)
         .delete(`/users/${userId}`);
   
      // Try to get the deleted blog and expect a 404 error
      const getResponse = await request(app)
         .get(`/users/${userId}`);
      expect(getResponse.status).toBe(404);
   }, 10000);

})



describe('comments API', () => {
   it('GET /comments --> array blogs', () => {
      return request(app)
         .get('/comments')
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


   it('GET /comments/id --> specific blog by ID', () => {
      return request(app)
         .get('/comments/6414332ca9c8f014d20356ad')
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


   it('GET /comments/id --> 404 if not found', () => {
      return request(app).get('/comments/33333').expect(404);
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
      // Create a new blog
      const newUser = {
         email: 'usera@gmail.com',
         message: 'made comment'
      };
      const createResponse = await request(app)
         .post('/comments')
         .send(newUser);
      const userId = createResponse.body._id;
   
      // Delete the blog
      const deleteResponse = await request(app)
         .delete(`/comments/${userId}`);
   
      // Try to get the deleted blog and expect a 404 error
      const getResponse = await request(app)
         .get(`/comments/${userId}`);
      expect(getResponse.status).toBe(404);
   }, 10000);

});


describe('Query API', () => {
   it('GET /query --> array blogs', () => {
      return request(app)
         .get('/query/api')
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


   it('GET /query/api/id --> specific blog by ID', () => {
      return request(app)
         .get('/comments/6414332ca9c8f014d20356ad')
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
      return request(app).get('/query/api/33333').expect(404);
   });

   it('POST /query/api --> create a comment', () => {
      return request(app).post('/comments').send({
         email: '45usqer@gmail.com',
         message: 'made query'
      })
     // .expect('Content-Type', /json/)
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


   it('DELETE /query/api/:id --> delete a user', async () => {
      // Create a new blog
      const newUser = {
         email: 'usera@gmail.com',
         message: 'made comment'
      };
      const createResponse = await request(app)
         .post('/query/api')
         .send(newUser);
      const userId = createResponse.body._id;
   
      // Delete the blog
      const deleteResponse = await request(app)
         .delete(`/query/api/${userId}`);
   
      // Try to get the deleted blog and expect a 404 error
      const getResponse = await request(app)
         .get(`/query/api/${userId}`);
      expect(getResponse.status).toBe(404);
   }, 10000);

})





