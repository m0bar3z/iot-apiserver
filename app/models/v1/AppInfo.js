let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let AppInfo = new Schema({
    os: { type: String, required: true },
    latestVersion: { type: String, required: true },
    update: { type: Boolean, required: true },
    isForce: { type: Boolean, required: true },
    updateUrl: String
});


AppInfo.plugin(timestamps);

module.exports = mongoose.model('AppInfo', AppInfo);