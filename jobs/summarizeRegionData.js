/**
 * Summarize Data Job - Regions
 * @module jobs/summarizeRegionData
*/




/**
 * Configuration
*/

// Database
const mongoose = require('mongoose');

const City = require('../server/models/City');
const CityData = require('../server/models/CityData');

let yesterdayStart = new Date(new Date().setDate(new Date().getDate() - 1));
yesterdayStart.setUTCHours(0, 0, 0, 0);
let yesterdayEnd = new Date(yesterdayStart);
yesterdayEnd.setUTCHours(23, 59, 59, 999);




/**
 * Functions
*/

/**
 * Return the total count for every country yesterday
 * @returns {Promise} - A promise
 */
function getTotalAmount() {
    return new Promise((resolveMAIN, rejectMAIN) => {
        // Get all countries data
        CityData.find({
            date: {
                $gte: yesterdayStart,
                $lt: yesterdayEnd
            }
        })
        .then((citiesData) => {
            var totalAmount = 0;
            citiesData.forEach((cityData) => {
                totalAmount += cityData.count;
            });
            resolveMAIN(totalAmount);
        })
        .catch((err) => {
            rejectMAIN(err);
        });
    });
}

/**
 * Summarize the data from yesterday
 * @param {totalAmount} - The total amount
 * @returns {Promise} - A promise
 */
function summarizeData(totalAmount) {
    return new Promise((resolveMAIN, rejectMAIN) => {
        // Get all cities
        City.find({}, (err, cities) => {
            if (err) {
                rejectMAIN(err);
            } else {
                // For each city
                Promise.all(cities.map((city) => {
                    return new Promise((resolve, reject) => {
                        // Get the city data from yesterday
                        CityData.find({
                            city: city._id,
                            date: {
                                $gte: yesterdayStart,
                                $lt: yesterdayEnd
                            }
                        })
                        .then((citiesData) => {
                            // Calculate the percentage
                            var count = 0;
                            citiesData.forEach((cityData) => {
                                count += cityData.count;
                            });
                            percentage = (count / totalAmount) * 100;

                            if (citiesData.length > 0) {
                                // Save the summarized data
                                CityData.create({
                                    city: city._id,
                                    date: yesterdayStart,
                                    count: count,
                                    percentageOfPopularity: percentage
                                })
                                .then(() => {
                                    // Delete citiesData content to keep only the summarized data
                                    Promise.all(citiesData.map((cityDataDelete) => {
                                        return new Promise((resolveDelete, rejectDelete) => {
                                            CityData.findByIdAndDelete(cityDataDelete._id, (errDelete) => {
                                                if (errDelete) {
                                                    rejectDelete(errDelete);
                                                } else {
                                                    resolveDelete();
                                                }
                                            });
                                        })
                                    }))
                                    .then(() => {
                                        resolve();
                                    })
                                    .catch((err) => {
                                        reject(err);
                                    });
                                })
                                .catch((err) => {
                                    reject(err);
                                });
                            } else {
                                resolve();
                            }
                        })
                        .catch((err) => {
                            reject(err);
                        });
                    });
                }))
                .then(() => {
                    resolveMAIN();
                })
                .catch((err) => {
                    rejectMAIN(err);
                });
            }
        });
    });
}





/**
 * Main
*/

function main() {
    mongoose.connect('mongodb://localhost:27017/worldwhere', { useNewUrlParser: true });

    // Fetch last data
    getTotalAmount()
    .then((totalAmount) => {
        if (!isNaN(totalAmount)) {
            summarizeData(totalAmount)
            .then(() => {
                console.log("///////////////////// Summarize Cities - Done : ", new Date().toLocaleString());
                mongoose.disconnect();
                process.exit();
            })
            .catch((err) => {
                console.log(err);
            });
        }
    })
    .catch(err => {
        console.log("ERR / Summarize Cities - Error : ", err);
        mongoose.disconnect();
    });
}


main()

