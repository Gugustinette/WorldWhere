/**
 * Data controller
 * Used to manage data
 * @module controllers/data
 * @requires models/Data
*/


const Data = require('../models/Data');


/**
 * Get Data - Get data from database
 * @param {*} req.query.data date of the data
 */
exports.getData = (req, res, next) => {
    // Get recent data from database
    Data.find({})
        .sort({
            createdAt: -1
        })
        .limit(10)
        .then(dataList => {
            res.status(200).json(dataList);
        })
        .catch(error => {
            res.status(400).json({
                error: "Couldn't get data"
            });
        });
}

