const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Market = new Schema({
    market_index: {
        type: Number,
        required: true,
        unique: true,
    },
    market_location: {
        type: String,
        required: true,
    },
    market_start_time: {
        type: Date,
        required: true,
        default: Date.now
    },
    market_end_time: {
        type: Date,
        required: true,
    },
    market_food: {
        type: [String],
        required: true,
    },
    market_category: {
        type: String,
        required: true,
    },
    market_payment_method: {
        type: [String],
        required: true,
    },
    market_explanation: {
        type: String,
        required: true,
        default: '아직 설명이 없습니다.'
    }
});

Market.statics.create = async function (market_index, market_location, market_start_time, market_end_time, market_food, market_category, market_payment_method, market_explanation){
    const find_market = await this.findOne({ "market_index": market_index});
    if(find_market) {
        throw 'market exists';
    }

    const market = new this({
        market_index: market_index,
        market_location: market_location,
        market_start_time: market_start_time,
        market_end_time: market_end_time,
        market_food: market_food,
        market_category: market_category,
        market_payment_method: market_payment_method,
        market_explanation: market_explanation,
    });

    console.log('market 생성: ' + market_index);

    return market.save()
}

Market.statics.delete = async function (market_index) {
    const market = await this.findOne({ "market_index": market_index});

    if(market) {
        return this.findOneAndDelete({ "market_index": market_index});
    } 
    else {
        throw 'market not exists';
    }
}

module.exports = mongoose.model('markets', Market);