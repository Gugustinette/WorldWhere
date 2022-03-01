/**
 * Fetch Data Job - Countries
 * @module jobs/fetchCountriesData
*/




/**
 * Configuration
*/

// Import ner for recognizing text elements
const ner = require('ner-promise');

const nerPromise = new ner({
	install_path: './lib/stanford-ner-2020-11-17/'
});

// Import twitter-api-v2
const tokenTwitter = require('../access/TWITTER_KEY.json')['bearer_token'];
const { TwitterApi } = require('twitter-api-v2');

const twitterClient = new TwitterApi(tokenTwitter);

// Database
const mongoose = require('mongoose');

const Country = require('../server/models/Country');
const CountryData = require('../server/models/CountryData');

// fs
const fs = require('fs');

// Config
const nbTweets = 100;




/**
 * Functions
*/

/**
 * Fetch Last Data - Fetch the last data from Twitter
 * @returns {Promise} - A promise that resolves to an array of valid countries
 */
function fetchLastData() {
    let lastData = {};
    return new Promise((resolveMAIN, rejectMAIN) => {
        twitterClient.v2.get('tweets/search/recent', { query: 'ukraine', 
        max_results: nbTweets })
            .then(result => {
                var tweets = result.data;

                // Make promises for each tweet
                var tweetsProcess = tweets.map(tweet => {
                    return new Promise((resolve, reject) => {

                        // Extract entities from text
                        nerPromise.process(tweet.text)
                        .then(entities => {
                            // Entities are LOCATION or PERSON or ORGANIZATION
                            // console.log(entities);
        
                            if (entities.LOCATION) {
                                entities.LOCATION.forEach(location => {
                                    var gpe = location.toLowerCase();
                                    if (lastData[gpe] === undefined) { // If not in lastData, create new entry
                                        lastData[gpe] = {
                                            count: 1
                                        };
                                    } else { // If in lastData, increment count
                                        lastData[gpe].count++;
                                    }
                                });
                            }
        
                            // Resolve promise
                            resolve();
                        })
                        .catch((err) => {
                            // Reject promise
                            reject(err);
                        });
                    });
                });

                // Launch all promises
                var promises = Promise.allSettled(tweetsProcess);
                promises.then(() => {
                    // For tests only
                    // fs.writeFileSync('data.json', JSON.stringify(db));
                    resolveMAIN(lastData);
                });
            })
            .catch(err => {
                rejectMAIN(err);
            });
    });
}

/**
 * Handle Countries - Add new countries if needed and return new valid countries
 * @param {A} lastData - The last data fetched from Twitter
 * @returns {Promise} - A promise that resolves to an array of valid countries
 */
function handleCountries(lastData) {
    return new Promise((resolveMAIN, rejectMAIN) => {

        // Countries Set
        var countriesSet = JSON.parse(fs.readFileSync("data/countries.json", 'utf8'));
        countriesSet.forEach((country) => {
            country.name = country.name.toLowerCase();
        });

        // Countries Acronyms
        var countriesAcronyms = JSON.parse(fs.readFileSync("data/countriesAcronyms.json", 'utf8'));

        // Iterate through lastData and countriesAcronyms to handle acronyms
        Object.keys(lastData).forEach(country => {
            for (var keyCountry in countriesAcronyms) {
                if (countriesAcronyms[keyCountry].includes(country)) {
                    if (lastData[keyCountry] === undefined) {
                        lastData[keyCountry] = lastData[country];
                    }
                    else {
                        lastData[keyCountry].count += lastData[country].count;
                    }
                    delete lastData[country];
                }
            }
        });

        // Iterate over lastData countries
        Promise.all(Object.keys(lastData).map(country => {
            return new Promise((resolve, reject) => {
                // Check if country is valid
                var countryInSet = countriesSet.find(c => c.name === country);
                if (countryInSet) { // If valid, add to db
                    // Check if country is allready in db
                    Country.findOne({ name: country }, (err, countryDb) => {
                        if (err) {
                            reject(err);
                        } else {
                            if (!countryDb) {
                                // Create new country
                                var newCountry = new Country({
                                    name: country,
                                });
                                // Save new Country
                                newCountry.save()
                                .then(() => { // If saved, add to db
                                    resolve(newCountry.name);
                                })
                                .catch(err => {
                                    reject(err);
                                });
                            }
                            else {
                                resolve(country);
                            }
                        }
                    });
                } else { // If not valid, do nothing
                    resolve();
                }
            });
        }))
        .then((countries) => {
            countries = countries.filter(c => c);
            resolveMAIN(countries);
        })
        .catch(err => {
            rejectMAIN(err);
        });
    });
}

/**
 * Add New Data - Add new data to the database
 * @param {A} lastData - The last data fetched from Twitter
 * @param {A} validCountries - The countries that are valid and should be added to the database
 * @returns {Promise} - A promise that resolves to an array of valid countries
 */
function addNewData(lastData, validCountries) {
    return new Promise((resolveMAIN, rejectMAIN) => {
        // Iterate over validCountries to calculate the total count
        var totalCount = 0;
        validCountries.forEach(country => {
            totalCount += lastData[country].count;
        });

        // Iterate over countries
        Promise.all(validCountries.map(country => {
            return new Promise((resolve, reject) => {
                // Find country in db
                Country.findOne({ name: country })
                .then(countryDb => {
                    // Create new countryData
                    var newCountryData = new CountryData({
                        country: countryDb._id,
                        percentageOfPopularity: lastData[country].count / totalCount * 100,
                    });
                    // Save new CountryData
                    newCountryData.save()
                    .then(() => {
                        resolve(newCountryData);
                    })
                    .catch(err => {
                        reject(err);
                    });
                });
            });
        }))
        .then((countriesData) => {
            countriesData = countriesData.filter(c => c);
            resolveMAIN(countriesData);
        })
        .catch(err => {
            rejectMAIN(err);
        });
    });
}





/**
 * Main
*/

function main() {
    mongoose.connect('mongodb://localhost:27017/worldwhere', { useNewUrlParser: true });

    // Fetch last data
    fetchLastData()
    .then(lastData => {
        handleCountries(lastData) // Handle Countries
        .then(validCountries => {
            addNewData(lastData, validCountries) // Add New Data
            .then((countriesData) => {
                console.log("///////////////////// All done");
                mongoose.disconnect();
            })
            .catch(err => {
                console.log(err);
            });
        })
        .catch(err => {
            console.log(err);
        });
    });
}


main()

