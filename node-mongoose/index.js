const mongoose = require('mongoose');
const dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db)=>{
    var newdish = dishes({
        name : "Meow",
        description : "test"
    });
    newdish.save()
    .then((dish)=>{
        console.log(dish);
        return dishes.find({})
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