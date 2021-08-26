const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    url: String,
    short: String,
    createdAt: {
        type: String,
        default: Date.now
    }
});

module.exports = mongoose.model('UrlModel', schema);