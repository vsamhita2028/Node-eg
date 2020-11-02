const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    rating :{
        type: Number,
        min :1,
        max : 5,
        required : true
    },
    comment :{
        type : String,
        required: true
    },
    author :{
        type : String,
        required : true
    }   
}, {
    timestamps :true
});
const dishesSchema = new Schema({
    name :{
        type : String,
        required : true,
        unique : true
    },
    description :{
        type : String,
        require : true,
    },
    comment : [commentSchema]
},{
    timestamps : true
}
);
const dish =mongoose.model("Dish",dishesSchema);
module.exports = dish;