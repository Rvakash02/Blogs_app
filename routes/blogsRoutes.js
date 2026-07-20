const express = require('express');
const router = express.Router();
const Blog = require('../models/blogs');
const blogController = require('../controllers/blogController');
const { requireAuth, checkUser } = require('../middleware/auth')

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
router.get('/blogs', checkUser, blogController.blog_index);

router.get('/blogs/create', blogController.blog_create_get);

router.get('/blogs/:id', checkUser, blogController.blog_details);

router.post('/blogs', requireAuth,  blogController.blog_create_post);

router.delete('/blogs/:id', requireAuth, blogController.blog_delete);

module.exports = router;

// const dbURI = 'mongodb+srv://rvakash02:Rvakash%400211@cluster0.engf63t.mongodb.net/blogs?retryWrites=true&w=majority&appName=Cluster0';
