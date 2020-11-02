const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishesSchema = new Schema({
    name :{
        type : String,
        required : true,
        unique : true
    },
    description :{
        type : String,
        require : true,
    }
},{
    timestamps : true
}
);
const dish =mongoose.model("Dish",dishesSchema);
module.exports = dish;