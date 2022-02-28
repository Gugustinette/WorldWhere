/**
 * CityData model
 * Represents the data of a city at a specific date
 * @module models/cityData
 * @requires mongoose
*/

const mongoose = require('mongoose');

/**
 * City type
 * @typedef {object} CityData
 * @property {string} _id - The id of the cityData object
 * @property {string} city - The id of the corresponding city
 * @property {string} date - The date of the corresponding data
 * @property {number} percentageOfPopularity - The percentage of Popularity of the city on the corresponding date
 */
const cityDataSchema = new mongoose.Schema({
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'city',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    percentageOfPopularity: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('CityData', cityDataSchema);
