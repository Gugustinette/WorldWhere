/**
 * Summarize Data Job - Countries
 * @module jobs/summarizeCountryData
*/




/**
 * Configuration
*/

// Database
const mongoose = require('mongoose');

const Country = require('../server/models/Country');
const CountryData = require('../server/models/CountryData');

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
        CountryData.find({
            date: {
                $gte: yesterdayStart,
                $lt: yesterdayEnd
            }
        })
        .then((countriesData) => {
            var totalAmount = 0;
            countriesData.forEach((countryData) => {
                totalAmount += countryData.count;
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
        // Get all countries
        Country.find({}, (err, countries) => {
            if (err) {
                rejectMAIN(err);
            } else {
                // For each country
                Promise.all(countries.map((country) => {
                    return new Promise((resolve, reject) => {
                        // Get the country data from yesterday
                        CountryData.find({
                            country: country._id,
                            date: {
                                $gte: yesterdayStart,
                                $lt: yesterdayEnd
                            }
                        })
                        .then((countriesData) => {
                            // Calculate the percentage
                            var count = 0;
                            countriesData?.forEach((countryData) => {
                                count += countryData.count;
                            });
                            percentage = (count / totalAmount) * 100;

                            if (countriesData.length > 0) {
                                // Save the summarized data
                                CountryData.create({
                                    country: country._id,
                                    date: yesterdayStart,
                                    count: count,
                                    percentageOfPopularity: percentage
                                })
                                .then(() => {
                                    // Delete countriesData content to keep only the summarized data
                                    Promise.all(countriesData.map((countryDataDelete) => {
                                        return new Promise((resolveDelete, rejectDelete) => {
                                            CountryData.findByIdAndDelete(countryDataDelete._id, (errDelete) => {
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
                console.log("///////////////////// Summarize Countries - Done : ", new Date().toLocaleString());
                mongoose.disconnect();
                process.exit();
            })
            .catch((err) => {
                console.log(err);
            });
        }
    })
    .catch(err => {
        console.log("ERR / Summarize Countries - Error : ", err);
        mongoose.disconnect();
    });
}


main()

