let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const bcrypt = require("bcrypt")

let User = new Schema({
    active:{ type: Boolean, default: true },
    username:{ type: String, required: true, unique: true },
    password: { type: String },
    name: String,
    family: String,
    email: String,
    mobile: { type: String, unique: true },
    device: { type: Array, default: [{ type: Schema.Types.ObjectId, ref: 'Device' }] },
});

User.pre('save', function(next){

    if (!this.isModified('password')) return next();

    bcrypt.hash(this.password, config.salt, (err, hash) => {
        this.password = hash;
        next();
    })
})

User.plugin(timestamps);

module.exports = mongoose.model('User', User);