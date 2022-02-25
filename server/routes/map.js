/**
 * Map routes
 * Used to manage Map data
 * @module routes/map
 * @requires express
 * @requires controllers/message
*/


var express = require('express');
var router = express.Router();
const countryController = require('../controllers/country');


/**
 * GET /api/map/getByCountry
 * @summary Get recent countries data from database
 * @tags map
 * @produces application/json
 * @security JWT
 * @param {string} query.date - date of the map
 * @return {array<map>} 200 - Success message
 * @return {string} 400 - Error message
 * @return {string} 500 - Internal Server Error
 */
router.get('/getByCountries', countryController.getCountries);


module.exports = router;

