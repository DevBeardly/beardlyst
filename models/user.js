const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        required: true
    },
});

module.exports = mongoose.model('User', userSchema);