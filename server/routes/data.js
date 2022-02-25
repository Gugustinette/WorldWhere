/**
 * Data routes
 * Used to manage data
 * @module routes/data
 * @requires express
 * @requires controllers/message
*/


var express = require('express');
var router = express.Router();
const dataController = require('../controllers/data');


/**
 * GET /api/data/get
 * @summary Get recent data from database
 * @tags data
 * @produces application/json
 * @security JWT
 * @param {string} query.date - date of the data
 * @return {array<Data>} 200 - Success message
 * @return {string} 400 - Error message
 * @return {string} 500 - Internal Server Error
 */
router.get('/get', dataController.getData);


module.exports = router;

