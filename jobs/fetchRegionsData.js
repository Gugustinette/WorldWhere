/**
 * Fetch Data Job - Regions data
 * @module jobs/fetchRegionsData
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

const City = require('../server/models/City');
const CityData = require('../server/models/CityData');

// fs
const fs = require('fs');

// Config
const nbTweets = 20;




/**
 * Functions
*/

/**
 * Fetch Last Data - Fetch the last data from Twitter
 * @returns {Promise} - A promise that resolves to an array of valid cities
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
 * Handle Cities - Add new cities if needed and return new valid cities
 * @param {A} lastData - The last data fetched from Twitter
 * @returns {Promise} - A promise that resolves to an array of valid cities
 */
function handleCities(lastData) {
    return new Promise((resolveMAIN, rejectMAIN) => {

        // Cities Set
        var citiesSet = JSON.parse(fs.readFileSync("data/cities.json", 'utf8'));
        citiesSet.forEach((city) => {
            city.name = city.name.toLowerCase();
        });

        // Cities Acronyms and other names
        var citiesAcronyms = JSON.parse(fs.readFileSync("data/citiesAcronyms.json", 'utf8'));

        // Iterate through lastData and citiesAcronyms to handle acronyms
        Object.keys(lastData).forEach(city => {
            for (var keyCity in citiesAcronyms) {
                if (citiesAcronyms[keyCity].includes(city)) {
                    if (lastData[keyCity] === undefined) {
                        lastData[keyCity] = lastData[city];
                    }
                    else {
                        lastData[keyCity].count += lastData[city].count;
                    }
                    delete lastData[city];
                }
            }
        });

        // Iterate over lastData cities
        Promise.all(Object.keys(lastData).map(city => {
            return new Promise((resolve, reject) => {
                // Check if city is valid
                var cityInSet = citiesSet.find(c => c.name === city);
                if (cityInSet) {
                    console.log(cityInSet);
                    // Check if city is allready in db
                    City.findOne({ name: city }, (err, cityDb) => {
                        if (err) {
                            reject(err);
                        } else {
                            if (!cityDb) {
                                // Create new city
                                var newCity = new City({
                                    name: city,
                                    latitude: cityInSet.lat,
                                    longitude: cityInSet.lng,
                                });
                                // Save new city
                                newCity.save()
                                .then(() => { // If saved, add to db
                                    resolve(newCity.name);
                                })
                                .catch(err => {
                                    reject(err);
                                });
                            }
                            else {
                                resolve(city);
                            }
                        }
                    });
                } else {
                    resolve();
                }
            });
        }))
        .then((cities) => {
            cities = cities.filter(c => c);
            resolveMAIN(cities);
        })
        .catch(err => {
            rejectMAIN(err);
        });
    });
}

/**
 * Add New Data - Add new data to the database
 * @param {A} lastData - The last data fetched from Twitter
 * @param {A} validcities - The cities that are valid and should be added to the database
 * @returns {Promise} - A promise that resolves to an array of valid cities
 */
function addNewData(lastData, validCities) {
    return new Promise((resolveMAIN, rejectMAIN) => {
        // Iterate over validcities to calculate the total count
        var totalCount = 0;
        validCities.forEach(city => {
            totalCount += lastData[city].count;
        });

        // Iterate over cities
        Promise.all(validCities.map(city => {
            return new Promise((resolve, reject) => {
                // Find city in db
                City.findOne({ name: city })
                .then(cityDb => {
                    // Create new cityData
                    var newCityData = new CityData({
                        city: cityDb._id,
                        percentageOfPopularity: lastData[city].count / totalCount * 100,
                    });
                    // Save new cityData
                    newCityData.save()
                    .then(() => {
                        resolve(newCityData);
                    })
                    .catch(err => {
                        reject(err);
                    });
                });
            });
        }))
        .then((citiesData) => {
            citiesData = citiesData.filter(c => c);
            resolveMAIN(citiesData);
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
        var lastData = {
            "kiev": {
                "count": 11
            },
            "moscow": {
                "count": 3
            },
            "london": {
                "count": 1
            },
        }
        console.log(lastData);
        handleCities(lastData) // Handle cities
        .then(validCities => {
            console.log(validCities);
            addNewData(lastData, validCities) // Add New Data
            .then((citiesData) => {
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

