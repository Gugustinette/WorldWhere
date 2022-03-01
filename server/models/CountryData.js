/**
 * CountryData model
 * Represents the data of a country at a specific date
 * @module models/CountryData
 * @requires mongoose
*/

const mongoose = require('mongoose');

/**
 * Country type
 * @typedef {object} CountryData
 * @property {string} _id - The id of the countryData object
 * @property {string} country - The id of the corresponding country
 * @property {string} date - The date of the corresponding data
 * @property {number} percentageOfPopularity - The percentage of Popularity of the country on the corresponding date
 * @property {number} count - Times the corresponding country has been mentioned
 * @property {string} death - The number of death of the country on the corresponding date
 */
const countryDataSchema = new mongoose.Schema({
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    percentageOfPopularity: {
        type: Number
    },
    count: {
        type: Number
    },
    death: {
        type: Number
    }
});

module.exports = mongoose.model('CountryData', countryDataSchema);
