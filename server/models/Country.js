/**
 * Country model
 * Represents a country
 * @module models/Country
 * @requires mongoose
*/

const mongoose = require('mongoose');

/**
 * Country type
 * @typedef {object} Country
 * @property {string} _id - The id of the country
 * @property {string} name - The name of the country
 * @property {string} death - The total death of the country
 */
const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    death: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Country', countrySchema);
