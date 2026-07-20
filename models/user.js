const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const userSchema = new Schema({
    username : {
        type : String ,
        required : true ,
        unique : true
    },

    name : {
         type : String ,
        required : true 
    },

    age : {
        type : Number ,
        required : true 
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
         type : String,
        required : true,
    }

}, {timestamp : true});

const user = mongoose.model('user', userSchema);
module.exports = user;