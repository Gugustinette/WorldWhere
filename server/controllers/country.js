/**
 * Country controller
 * Used to manage countries
 * @module controllers/country
 * @requires models/Country
*/


const Country = require('../models/Country');
const CountryData = require('../models/CountryData');


/**
 * Get Countries - Get countries from database
 * @param {*} req.query.dateStart date of the data
 * @param {*} req.query.dateEnd date of the data
 * @param {*} req.query.full if true, return all countries, else return only the countries with data
 */
exports.getCountries = (req, res, next) => {
    // Get recent data from database
    Country.find({})
        .then(countries => {
            // Get country data from database (1 hour - 2 hour ago)
            CountryData.find({
                date: {
                    $gte: new Date(new Date().getTime() - 3600000),
                    $lt: new Date(new Date().getTime())
                }
            })
            .then(countriesData => {

                // Return countries and country data
                var countriesWithData = [];
                countries.forEach(country => {
                    // Find corresponding country data
                    var countryData = countriesData.find(countryData => countryData.country.toString() === country._id.toString());
                    if (countryData || req.query.full) {
                        countriesWithData.push({
                            country: {
                                name: country.name
                            },
                            percentageOfPopularity: countryData ? countryData.percentageOfPopularity : undefined
                        });
                    }
                });

                res.status(200).json({
                    data: countriesWithData,
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Failed to get country data',
                    error: err
                });
            });
        })
        .catch(error => {
            res.status(400).json({
                error: "Couldn't get countries"
            });
        });
}

