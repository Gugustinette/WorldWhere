/**
 * Country model
 * Represents a country
 * @module models/Country
 * @requires mongoose
*/

const mongoose = require('mongoose');

/**
 * Country type
 * @typedef {object} country
 * @property {string} _id - The id of the country
 * @property {string} name - The name of the country
 */
const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Country', countrySchema);
