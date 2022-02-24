/**
 * Main file
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
const tokenTwitter = require('./access/TWITTER_KEY.json')['bearer_token'];
const { TwitterApi } = require('twitter-api-v2');

const twitterClient = new TwitterApi(tokenTwitter);

// Database
let db = {};




/**
 * Script
*/

// Fetch tweets
twitterClient.v2.get('tweets/search/recent', { query: 'ukraine', max_results: 10 })
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
        });
    })
    .catch(err => {
        console.error(err);
    });
