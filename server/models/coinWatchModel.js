const mongoose = require('mongoose');

const coinWatchModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectID,
        required: true,
        ref: 'User'
    },
    coin: {
        type: String,
        required: [true, 'Please add a coin'],
    }
},{
    timestamps: true
});

module.exports = mongoose.model('CoinList', coinWatchModel);