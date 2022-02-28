/**
 * server.js
 * Define the server side application
 * 
 * /routes - Contains all routes
 * /models - Contains all models
 * /controllers - Contains all controllers
 */

// App Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes Dependencies
const countryRouter = require('./routes/country');

// Swagger Dependencies
const expressJSDocSwagger = require('express-jsdoc-swagger');

const options = {
  info: {
    version: '1.0.0',
    title: 'WorldWhere Rest API',
    description: 'WorldWhere Rest API Documentation',
    license: {
      name: 'MIT',
    },
  },
  baseDir: __dirname,
  // Global patterns to find jsdoc files (multiple patterns can be added in an array)
  filesPattern: ['./routes/*.js', './models/*.js'],
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/api/documentation',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // UI options
  swaggerUiOptions: {},
};



// App Initialization
const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true
    }
));

// Configure Routes
app.use('/api/country', countryRouter);

// Configure Swagger
expressJSDocSwagger(app)(options);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/worldwhere', {useUnifiedTopology: true, useNewUrlParser: true});



module.exports = app;
