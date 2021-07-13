
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

var ServerError = new Schema({
    project: String,
    errorType: String,
    parent: String,
    class: String,
    method: String,
    inputParams: Object,
    message: String,
    stack: String
});

ServerError.plugin(timestamps);




module.exports = mongoose.model('ServerError', ServerError);