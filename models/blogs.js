const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const blogSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    snippet : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    image:{
        type:String
    },
    genre: {
        type: String,
        required: true,
        enum: ['Technology', 'Programming', 'Travel', 'Life', 'Education', 'Sports', 'News']
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
    
} , {timestamps: true});

const Blog = mongoose.model('Blog', blogSchema) ;
module.exports = Blog; 