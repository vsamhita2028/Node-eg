const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    firstname: {
        type: String,
          default: ''
      },
      lastname: {
        type: String,
          default: ''
      },    
    admin : {
        type : Boolean,
        default : false
    }
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('Users',User);