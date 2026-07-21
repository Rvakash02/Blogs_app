const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require('./database/db')


const app = express();

const blogRoute = require('./routes/blogsRoutes');
const userRoute = require('./routes/userRoute');


// Middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

// Non-blog routes

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

app.get('/', (req, res) => {
    res.send('hello world')
});
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
