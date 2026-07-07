const express = require('express');
const router = express.Router();
const multer = require('multer');
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

router.get('/blogs/:id', (req, res) => {
    const id = req.params.id.trim();

    Blog.findById(id)
        .then(result => {
            res.render('details', {
                title: 'Blog Details',
                blog: result
            });
        })
        .catch(err => {
            console.log(err);
        });
});


// Add the rest of your blog routes here...
const upload = multer({ dest: 'public/uploads/' });

router.post('/blogs', upload.single('image'), (req, res) => {

    const blog = new Blog({
        title: req.body.title,
        snippet: req.body.snippet,
        body: req.body.body,
        image: req.file ? req.file.filename : null
    });

    blog.save()
        .then(result => {
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
        });
});

router.delete('/blogs/:id', (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then(result => {
            res.json({
                redirect: '/blogs'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router;

// const dbURI = 'mongodb+srv://rvakash02:Rvakash%400211@cluster0.engf63t.mongodb.net/blogs?retryWrites=true&w=majority&appName=Cluster0';
