let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let DeviceLog = new Schema({
    deviceId:{ type: Schema.Types.ObjectId, ref: 'Device' },
    user:{ type: Schema.Types.ObjectId, ref: 'User' },
    relay1: String,
    relay2: String,
    relay3: String,
    relay4: String,
    done: { type: Boolean, default: false}
});

DeviceLog.plugin(timestamps);




module.exports = mongoose.model('DeviceLog', DeviceLog);