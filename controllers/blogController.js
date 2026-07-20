// blog_index , blog_details , blog_create_get, blog_create_post, blog_delete.

const { render } = require('ejs');
const Blog = require('../models/blogs');
const User = require('../models/user');

const blog_index = async (req, res) => {
    try { 
        const allBlogs = await Blog.find().sort({ createdAt: -1 });

        let myBlogs = [];
        if(req.user){
            myBlogs = await Blog.find({createdBy : req.user._id}).sort({ createdAt: -1 });
        }
        
        res.render('all_blogs', {
            title : 'All Blogs',
            myBlogs ,
            blogs: allBlogs
        });
    } 
    catch(err){
        console.log(err);
        
    } 
}

const blog_details = async (req,res) => {
    try {
        const id = req.params.id.trim();
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).render('404', {title : 'Blog not found'});
        }

        const canDelete = req.user && blog.createdBy.equals(req.user._id);

        res.render('details', {
            title: 'Blog Details',
            blog,
            canDelete
        });
    } catch(err) {
        res.status(404).render('404', {title : 'Blog not found'});
    }
}

const blog_create_get = (req, res) => {
    res.render('create', {
        title: 'Create Blog'
    });
}



const blog_create_post = (req, res) => {

    const blog = new Blog({
        title: req.body.title,
        snippet: req.body.snippet,
        body: req.body.body,
        genre : req.body.genre,
        createdBy : req.user._id,
    });

    blog.save()
        .then(result => {
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
        });
}

const blog_delete = async (req, res) => {
    try {
        const result = await Blog.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user._id
        });

        if (!result) {
            return res.status(403).json({ error: 'You can only delete your own blogs.' });
        }

        res.json({
            redirect: '/blogs'
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
}

module.exports = {
    blog_index,
    // myBlogs,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
}
