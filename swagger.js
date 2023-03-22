const swaggerJsdoc = require('swagger-jsdoc');

function swagger(app) {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'My Brand API',
        version: '1.0.0',
        description: 'API documentation for My Brand',
      },
      servers: [
        {
          url: 'https://hirwa-arnold.cyclic.app',
        },
      ],
    },
    apis: ['./routes/*.js'],
  };

  const swaggerSpec = swaggerJsdoc(options);
  
  return swaggerSpec;
}

module.exports = swagger;
