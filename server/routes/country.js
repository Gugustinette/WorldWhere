/**
 * Country routes
 * Used to manage country data
 * @module routes/country
 * @requires express
 * @requires controllers/country
*/


var express = require('express');
var router = express.Router();
const countryController = require('../controllers/country');


/**
 * GET /api/country/getByCountry
 * @summary Get recent countries data from database
 * @tags country
 * @produces application/json
 * @security JWT
 * @param {string} query.date - date of the country
 * @return {array<Country>} 200 - Success message
 * @return {string} 400 - Error message
 * @return {string} 500 - Internal Server Error
 */
router.get('/getByCountries', countryController.getCountries);


module.exports = router;

