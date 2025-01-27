const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const Schema = mongoose.Schema;
var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
}, {
    timestamps: true
});

var dishesSchema = new Schema({
    name :{
        type : String,
        required : true,
        unique : true
    },
    image :{
        type : String,
        require :true
    },
    category :{
        type : String,
        require :true
    },
    label :{
        type : String,
        default : ""
    },
    price :{
        type : Currency,
        require :true
    },
    featured :{
        type : Boolean,
        require :true
    },
    description :{
        type : String,
        require : true,
    },
    comments : [commentSchema]
},{
    timestamps : true
}
);
const dish =mongoose.model("Dish",dishesSchema);
module.exports = dish;