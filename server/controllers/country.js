/**
 * Country controller
 * Used to manage countries
 * @module controllers/country
 * @requires models/Country
*/


const Country = require('../models/Country');


/**
 * Get Countries - Get countries from database
 * @param {*} req.query.data date of the data
 */
exports.getCountries = (req, res, next) => {
    // Get recent data from database
    Country.find({})
        .sort({
            createdAt: -1
        })
        .limit(10)
        .then(countries => {
            res.status(200).json(countries);
        })
        .catch(error => {
            res.status(400).json({
                error: "Couldn't get countries"
            });
        });
}

