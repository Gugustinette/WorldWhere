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


/**
 * Get city - Get a specific city from database
 * @param {*} req.query.cityId Id of the city
 * @param {*} req.query.dateStart date of the data
 * @param {*} req.query.dateEnd date of the data
*/
exports.getCityData = (req, res, next) => {
    // Get city data from database
    CityData.find({
        city: req.query.cityId,
        date: {
            $gte: req.query.dateStart ? new Date(req.query.dateStart) : "2000-01-01",
            $lt: req.query.dateEnd ? new Date(req.query.dateEnd) : new Date()
        }
    })
    .then(cityDataList => {
        cityDataToReturn = [];
        cityDataList.forEach(cityData => {
            cityDataToReturn.push({
                _id: cityData._id,
                date: cityData.date,
                percentageOfPopularity: cityData.percentageOfPopularity,
                count: cityData.count
            });
        });

        res.status(200).json({
            data: cityDataToReturn,
            city: req.query.cityId
        });
    })
    .catch(err => {
        res.status(500).json({
            message: 'Failed to get city data',
            error: err
        });
    });
}
