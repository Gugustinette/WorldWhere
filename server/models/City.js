/**
 * City model
 * Represents a city
 * @module models/city
 * @requires mongoose
*/

const mongoose = require('mongoose');

/**
 * City type
 * @typedef {object} City
 * @property {string} _id - The id of the city
 * @property {string} name - The name of the city
 * @property {string} longitude - The longitude of the city
 * @property {string} latitude - The latitude of the city
 */
const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('City', citySchema);
