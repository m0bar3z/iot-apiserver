let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let VerificationCode = new Schema({
    mobile: { type: String },
    code: { type: String }
});

VerificationCode.plugin(timestamps);

module.exports = mongoose.model('VerificationCode', VerificationCode);