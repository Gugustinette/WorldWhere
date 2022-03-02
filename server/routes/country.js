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
 * GET /api/country/getByCountries
 * @summary Get recent countries data from database
 * @tags country
 * @produces application/json
 * @security JWT
 * @param {string} query.dateStart - date of the data
 * @param {string} query.dateEnd - date of the data
 * @param {boolean} query.full - if true, return all countries, else return only the countries with data
 * @return {array<CountryData>} 200 - Success message
 * @return {string} 400 - Error message
 * @return {string} 500 - Internal Server Error
 */
router.get('/getByCountries', countryController.getCountries);

/**
 * GET /api/country/getCountryData
 * @summary Get datas from a specific country
 * @tags country
 * @produces application/json
 * @security JWT
 * @param {string} query.countryId - Id of the country
 * @param {string} query.dateStart - date of the data
 * @param {string} query.dateEnd - date of the data
 * @return {array<CountryData>} 200 - Success message
 * @return {string} 400 - Error message
 * @return {string} 500 - Internal Server Error
 */
 router.get('/getCountryData', countryController.getCountryData);


module.exports = router;

