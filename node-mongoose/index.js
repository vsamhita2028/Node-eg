const mongoose = require('mongoose');
const dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db)=>{
     dishes.create({
        name : "Meow",
        description : "test"
    })
    .then((dish)=>{
        console.log(dish);
        return dishes.findByIdAndUpdate(dish._id,{
            $set : {description : "Updated description"}
        },
        {
            new : true
        }).exec();
    })
    .then((dish)=>{
        console.log(dish);

        dish.comment.push({
            rating : 5,
            comment : "Dommu chua",
            author : "boo"
        });
        return dish.save();
    })
    .then((dish)=>{
        console.log(dish);
        return dishes.deleteMany({});
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch((err)=> console.log(err)); 
});