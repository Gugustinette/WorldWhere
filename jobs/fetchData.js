/**
 * Fetch Data Job
 * @module jobs/fetchData
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
mongoose.connect('mongodb://localhost:27017/worldwhere3', {useUnifiedTopology: true, useNewUrlParser: true});

const Country = require('../server/models/Country');
const CountryData = require('../server/models/CountryData');

let db = {};

const fs = require('fs');


/**
 * Script
*/

// Fetch tweets
function fetchLastData() {
    twitterClient.v2.get('tweets/search/recent', { query: 'ukraine', 
    max_results: 10 })
        .then(result => {
            var tweets = result.data;
    
            // Make promises for each tweet
            var tweetsProcess = tweets.map(tweet => {
                return new Promise((resolve, reject) => {
    
                    // Extract entities from text
                    nerPromise.process(tweet.text)
                    .then(entities => {
                        // Entities are LOCATION or PERSON or ORGANIZATION
                        console.log(entities);
    
                        if (entities.LOCATION) {
                            entities.LOCATION.forEach(location => {
                                var gpe = location.toLowerCase();
                                if (db[gpe] === undefined) { // If not in db, create new entry
                                    db[gpe] = {
                                        count: 1
                                    };
                                } else { // If in db, increment count
                                    db[gpe].count++;
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
                console.log("///////////////////// Database: ");
                console.log(db);
                fs.writeFileSync('data.json', JSON.stringify(db));
            });
        })
        .catch(err => {
            console.error(err);
        });
}

// Read data
function addDataToDb(lastData) {
    console.log(lastData);

    // Countries Set
    var countriesSet = JSON.parse(fs.readFileSync("data/countries.json", 'utf8'));
    countriesSet.forEach((country) => {
        country.name = country.name.toLowerCase();
    });

    console.log(countriesSet);
}


fs.readFile("data.json", 'utf8', (error, data) => {
    addDataToDb(JSON.parse(data));

    mongoose.disconnect();
});
