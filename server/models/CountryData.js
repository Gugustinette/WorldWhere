/**
 * CountryData model
 * Represents the data of a country at a specific date
 * @module models/CountryData
 * @requires mongoose
*/

const mongoose = require('mongoose');

/**
 * Country type
 * @typedef {object} countryData
 * @property {string} _id - The id of the countryData object
 * @property {string} country - The id of the corresponding country
 * @property {string} date - The date of the corresponding data
 * @property {number} percentageOfPopularity - The percentage of Popularity of the country on the corresponding date
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
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('CountryData', countryDataSchema);
