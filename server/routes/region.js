/**
 * Region routes
 * Used to manage region data
 * @module routes/region
 * @requires express
 * @requires controllers/region
*/


var express = require('express');
var router = express.Router();
const regionController = require('../controllers/region');


/**
 * GET /api/region/getByCities
 * @summary Get recent cities data from database
 * @tags region
 * @produces application/json
 * @security JWT
 * @param {string} query.dateStart - date of the data
 * @param {string} query.dateEnd - date of the data
 * @param {boolean} query.full - if true, return all cities, else return only the cities with data
 * @return {array<City>} 200 - Success message
 * @return {string} 400 - Error message
 * @return {string} 500 - Internal Server Error
 */
router.get('/getByCities', regionController.getCities);


module.exports = router;

