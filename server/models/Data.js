/**
 * Data model
 * Represents a data
 * @module models/Message
 * @requires mongoose
*/

const mongoose = require('mongoose');

/**
 * Data type
 * @typedef {object} Data
 * @property {string} _id - The id of the data
 * @property {string} name - The name of the data
 */
const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Data', dataSchema);
