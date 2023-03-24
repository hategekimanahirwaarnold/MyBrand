// process.env.NODE_ENV_CUSTOM = 'test';
// const request = require('supertest');
// const app = require('../app');

 

// // create a new blob
// const newBlog = {
//    title: 'Test blog',
//    description: 'Test description',
//    body: 'Test body',
// };
// const createBlog = async () => {
//    const response = await request(app)
//      .post('/blogs/api')
//      .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
//      .send(newBlog);
//    return response;
//  };
//  createBlog();
 
//  const blogid = async () => {
//    const response = await createBlog();
//    const blogId = response.body._id;
//    return blogId
//  };

//  // Create a new user
// const newUser = {
//     email: 'ushatedera1a@gmail.com',
//     password: 'made user'
// };
//  const createUser = async ()=> {
//     const response = await request(app)
//     .post('/users')
//     .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
//     .send(newUser);
//     return response;
// }; 
// createUser();
// const userid = async () => {
//    const response = await createUser();
//    const userId = response.body._id;
//    return userId
//  };

//  // Create a new comment
//  const newComment= {
//    email: 'usera@gmail.com',
//    message: 'made comment'
// };
// const createComment = async ()=> {
//    const response = await request(app)
//    .post('/comments')
//    .send(newComment);
//    return response;
// };
// createComment();
// const commentId = async () => {
//    const response = await createComment();
//    const userId = response.body._id;
//    return userId
//  };   

//  // Create a new query
//    const newquery = {
//     email: 'usera@gmail.com',
//     message: 'made query'
//  };
//  const createQuery = async ()=> {
//     const response = await request(app)
//     .post('/query/api')
//     .send(newquery);
//     return response;
//  };
//  createQuery(); 
//  const queryId = async () => {
//    const response = await createQuery();
//    const userId = response.body._id;
//    return userId
//  };   


// //beginning of tests
// describe('Blogs API', () => {
//    it('GET /blogs/api --> array blogs', () => {
//       return request(app)
//          .get('/blogs/api')
//          .expect('Content-Type', /json/)
//          .expect(200)
//          .then((response) => {
//             expect(response.body).toEqual(expect.arrayContaining([
//                expect.objectContaining({
//                   title: expect.any(String),
//                   description: expect.any(String),
//                   body: expect.any(String),
//                }),
//             ])
//             );
//          });
//    }, 38000);

//     // single blog
//    it('GET /blogs/api/:id --> specific blog by ID', async () => {
//       const id = await blogid(); // Call the blogid function and await its result
//       return request(app)
//       .get(`/blogs/api/${id}`)
//       .expect('Content-Type', /json/)
//       .expect(200)
//       .then((response) => {
//          expect(response.body).toEqual(
//             expect.objectContaining({
//             title: expect.any(String),
//             description: expect.any(String),
//             body: expect.any(String),
//             }),
//          );
//       });
//    }, 6000);


//    it('GET /blogs/api/id --> 404 if not found', () => {
//       return request(app).get('/blogs/api/33333').expect(404);
//    });
 
//    it('POST /blogs/api --> create a blog', () => {
//       return request(app)
//       .post('/blogs/api')
//       .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
//       .send({
//          title: 'to test new blog created',
//          description: 'made desc',
//          body: 'made body',
//       })
//       .expect('Content-Type', /json/)
//       .expect(201)
//       .then((response) => {
//          expect(response.body).toEqual(
//             expect.objectContaining({
//             title: 'to test new blog created',
//             description: 'made desc',
//             body: 'made body',
//             })
//          );
//       });
//    });

//     it('UPDATE /blogs/api/id --> edit a blogs', async () => {
//       const id = await blogid(); // Call the blogid function and await its result
//       return request(app)
//       .put(`/blogs/api/${id}`)
//       .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
//       .send({
//          title: 'blog updated',
//          description: 'made it desc',
//          body: 'made body',
//       })
//       .expect('Content-Type', /json/).expect(200)
//       .then((response) => {
//          expect(response.body).toEqual(
//             expect.objectContaining({
//                title: 'blog updated',
//                description: 'made it desc',
//                body: 'made body',
//             }),
//          );
//       });
//    });

//    it('DELETE /blogs/api/:id --> delete a blog', async () => {
//       // Create a new blog
//       const newBlog = {
//          title: 'Test blog',
//          description: 'Test description',
//          body: 'Test body',
//       };
//       const createResponse = await request(app)
//          .post('/blogs/api')
//          .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
//          .send(newBlog);
//       const blogId = createResponse.body._id;
      
//       // Delete the blog
//       const deleteResponse = await request(app)
//          .delete(`/blogs/api/${blogId}`)
//          .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
//          //expect(deleteResponse.status).toBe(200);
   
//       // Try to get the deleted blog and expect a 404 error
//       const getResponse = await request(app)
//          .get(`/blogs/api/${blogId}`);
//          expect(getResponse.status).toBe(404);
//    }, 10000);

// });

// describe('Users API', () => {
//    it('GET /users --> array of users', () => {
//       return request(app)
//          .get('/users')
//          .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
//          .expect('Content-Type', /json/)
//          .expect(200)
//          .then((response) => {
//             expect(response.body).toEqual(expect.arrayContaining([
//                expect.objectContaining({
//                   email: expect.any(String),
//                   password: expect.any(String)
//                }),
//             ])
//             );
//          });
//    }, 23000);


//    // it('GET /users/id --> specific user by ID', async () => {
//    //    const anewUser = {
//    //       email: 'ushatuuuedera1a@gmail.com',
//    //       password: 'made user'
//    //   };
//    //    // Create a new user
//    //    const createnewUser = async ()=> {
//    //       const response = await request(app)
//    //       .post('/users')
//    //       .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
//    //       .send(anewUser);
//    //       return response;
//    //    }; 
//    //    const userid = async () => {
//    //       const response = await createnewUser();
//    //       const userId = response.body._id;
//    //       return userId
//    //    };
//    //   const id = await userid();
//    //   console.log('User ID:', id);
//    //   await request(app)
//    //     .get(`/users/${id}`)
//    //     .set('Cookie', `Adjwt=${process.env.TOKEN}`)
//    //     .expect(200)
//    //     .then((response) => {
//    //       expect(response.body).toEqual(
//    //         expect.objectContaining({
//    //           password: expect.any(String),
//    //           email: expect.any(String)
//    //         }),
//    //       );
//    //     });
     
//    //   await request(app)
//    //     .delete(`/users/${id}`)
//    //     .set('Cookie', `Adjwt=${process.env.TOKEN}`)
//    //     .expect(200);
   
//    // }, 10000);


//    it('GET /users/id --> 404 if not found', () => {
//       return request(app)
//       .get('/users/33333').expect(404)
//       .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
//    });


//    it('DELETE /users/:id --> delete a user', async () => {
//       const id = await userid(); // Call the userid function and await its result
//       // Delete the user
//       const deleteResponse = await request(app)
//          .delete(`/users/${id}`)
//          .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
   
//       // Try to get the deleted user and expect a 404 error
//       const getResponse = await request(app)
//          .get(`/users/${id}`)
//          .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
//          expect(getResponse.status).toBe(404);
//    }, 10000);

// })



// describe('comments API', () => {
//    it('GET /comments --> array comments', () => {
//       return request(app)
//          .get('/comments')
//          .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
//          .expect('Content-Type', /json/)
//          .expect(200)
//          .then((response) => {
//             expect(response.body).toEqual(expect.arrayContaining([
//                expect.objectContaining({
//                   email: expect.any(String),
//                   message: expect.any(String)
//                }),
//             ])
//             );
//          });
//    }, 23000);


//    it('GET /comments/id --> specific comment by ID', async () => {
//       const id = await commentId(); // Call the blogid function and await its result
//       return request(app)
//          .get(`/comments/${id}`)
//          .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
//          .expect('Content-Type', /json/)
//          .expect(200)
//          .then((response) => {
//             expect(response.body).toEqual(
//                expect.objectContaining({
//                   message: expect.any(String),
//                   email: expect.any(String)
//                }),
//             );
//          });
//    }, 6000);


//    it('GET /Comments/id --> 404 if not found', () => {
//       return request(app)
//       .get('/comments/33333')
//       .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
//       .expect(404);
//    });

//    it('POST /comments --> create a comment', () => {
//       return request(app).post('/comments').send({
//          email: '45usqer@gmail.com',
//          message: 'made pass'
//       })
//      // .expect('Content-Type', /json/)
//       .expect(201)
//       .then((response) => {
//          expect(response.body).toEqual(
//             expect.objectContaining({
//                email: '45usqer@gmail.com',
//                message: 'made pass'
//             }),
//          );
//       });
//    }, 6000);


//    it('DELETE /comments/:id --> delete a user', async () => {
//       const id = await commentId(); // Call the blogid function and await its result
     
//       // Delete the comment
//       const deleteResponse = await request(app)
//          .delete(`/comments/${id}`)
//          .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
   
//       // Try to get the deleted a comment and expect a 404 error
//       const getResponse = await request(app)
//          .get(`/comments/${id}`)
//          .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
//          expect(getResponse.status).toBe(404);
//    }, 10000);

// });


// describe('Query API', () => {
//    it('GET /query --> array queries', () => {
//       return request(app)
//          .get('/query/api')
//          .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
//          .expect('Content-Type', /json/)
//          .expect(200)
//          .then((response) => {
//             expect(response.body).toEqual(expect.arrayContaining([
//                expect.objectContaining({
//                   email: expect.any(String),
//                   message: expect.any(String)
//                }),
//             ])
//             );
//          });
//    }, 23000);


//    it('GET /query/api/id --> specific query by ID', async () => {
//       const id = await queryId(); // Call the blogid function and await its result
//       return request(app)
//          .get(`/query/api/${id}`)
//          .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
//          .expect('Content-Type', /json/)
//          .expect(200)
//          .then((response) => {
//             expect(response.body).toEqual(
//                expect.objectContaining({
//                   message: expect.any(String),
//                   email: expect.any(String)
//                }),
//             );
//          });
//    }, 6000);


//    it('GET /query/api/id --> 404 if not found', () => {
//       return request(app)
//       .get('/query/api/33333')
//       .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
//       .expect(404);
//    });

//    it('POST /query/api --> create a query', () => {
//       return request(app).post('/query/api').send({
//          email: '45usqer@gmail.com',
//          message: 'made query'
//       })
//       .expect('Content-Type', /json/)
//       .expect(201)
//       .then((response) => {
//          expect(response.body).toEqual(
//             expect.objectContaining({
//                email: '45usqer@gmail.com',
//                message: 'made query'
//             }),
//          );
//       });
//    });


//    it('DELETE /query/api/:id --> delete a query', async () => {
//       const id = await queryId(); // Call the blogid function and await its result
    
//       // Delete the blog
//       const deleteResponse = await request(app)
//          .delete(`/query/api/${id}`)
//          .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
   
//       // Try to get the deleted blog and expect a 404 error
//       const getResponse = await request(app)
//          .get(`/query/api/${id}`)
//          .set('Cookie', `Adjwt=${process.env.TOKEN}`) // set the Authorization header with the JWT token
//          expect(getResponse.status).toBe(404);
//    }, 10000);

// })





