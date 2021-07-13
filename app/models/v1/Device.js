let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let Device = new Schema({
    active:{ type: Boolean, default: true},
    name:{ type: String, required: true},
    macId: { type: String ,required: true,unique: true },
    ownerId:{ type: Schema.Types.ObjectId, ref: 'User' },
    relay:{ type: Array, default: [] },
    user: { type: Array, default: [{ type: Schema.Types.ObjectId, ref: 'User' }] },
});

Device.plugin(timestamps);




module.exports = mongoose.model('Device', Device);