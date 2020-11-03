const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var Schema = mongoose.Schema;

var promoSchema = new Schema({
    name :{
        type : String,
        required : true
    },
    image :{
        type :String,
        required : true
    },
    label : {
        type : String,
        default : ""
    },
    price : {
        type : Currency,
        required : true
    },
    description :{
        type :String,
        required : true
    },
    featured : {
        type :Boolean,
        required : true
    }
},{
    timestamps : true
});

var promotion = mongoose.model("Promotions",promoSchema);
module.exports = promotion;