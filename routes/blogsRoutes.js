const express = require('express');
const router = express.Router();

const Blog = require('../models/blogs');

// Home page
router.get('/', (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .limit(3)
        .then(result => {
            res.render('index', {
                title: 'Home',
                blogs: result
            });
        })
        .catch(err => {
            console.log(err);
        });
});

// All blogs
router.get('/blogs', (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then(result => {
            res.render('all_blogs', {
                title: 'All Blogs',
                blogs: result
            });
        })
        .catch(err => console.log(err));
});

// Create page
router.get('/blogs/create', (req, res) => {
    res.render('create', {
        title: 'Create Blog'
    });
});

// Add the rest of your blog routes here...

module.exports = router;

// const dbURI = 'mongodb+srv://rvakash02:Rvakash%400211@cluster0.engf63t.mongodb.net/blogs?retryWrites=true&w=majority&appName=Cluster0';
