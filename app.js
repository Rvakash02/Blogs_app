const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require("cookie-parser");


const app = express();

const blogRoute = require('./routes/blogsRoutes');
const userRoute = require('./routes/userRoute');

const dbURI =  'mongodb+srv://rvakash02:Rvakash%400211@cluster0.engf63t.mongodb.net/blogs?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI)
    .then(() => {
        console.log('DB connected');
        app.listen(3000, () => {
            console.log('Server running on http://localhost:3000');
        });
    })
    .catch(err => console.log(err));

// Middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

// Non-blog routes

app.get('/home', (req, res) => {
    res.redirect('/');
});


app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// Blog routes
app.use(blogRoute);

//signup page
app.use('/user', userRoute);

// 404
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});