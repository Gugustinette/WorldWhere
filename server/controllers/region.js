/**
 * Region controller
 * Used to manage cities
 * @module controllers/city
 * @requires models/city
*/


const City = require('../models/City');
const CityData = require('../models/CityData');


/**
 * Get cities - Get cities from database
 * @param {*} req.query.dateStart date of the data
 * @param {*} req.query.dateEnd date of the data
 * @param {*} req.query.full if true, return all cities, else return only the cities with data
 */
exports.getCities = (req, res, next) => {
    // Get recent data from database
    City.find({})
        .then(cities => {
            // Get city data from database (1 hour - 2 hour ago)
            CityData.find({
                date: {
                    $gte: new Date(new Date().getTime() - 3600000 * 2),
                    $lt: new Date(new Date().getTime() - 3600000)
                }
            })
            .then(citiesData => {

                // Return cities and city data
                var citiesWithData = [];
                cities.forEach(city => {
                    // Find corresponding city data
                    var cityData = citiesData.find(cityData => cityData.city.toString() === city._id.toString());
                    if (cityData || req.query.full) {
                        citiesWithData.push({
                            city: {
                                name: city.name,
                                latitude: city.latitude,
                                longitude: city.longitude
                            },
                            percentageOfPopularity: cityData ? cityData.percentageOfPopularity : undefined
                        });
                    }
                });

                res.status(200).json({
                    data: citiesWithData,
                    lastDataUpdate: citiesData[0] ? citiesData[0].date : undefined
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Failed to get city data',
                    error: err
                });
            });
        })
        .catch(error => {
            res.status(400).json({
                error: "Couldn't get cities"
            });
        });
}

