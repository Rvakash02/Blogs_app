const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require('./database/db');
const { checkUser } = require('./middleware/auth');

const app = express();

const blogRoute = require('./routes/blogsRoutes');
const userRoute = require('./routes/userRoute');

// Initiate DB Connection
connectDB();

// Middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(checkUser);

// Non-blog routes
app.get('/home', (req, res) => {
    res.redirect('/');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// Blog routes
app.use(blogRoute);

// User routes
app.use('/user', userRoute);

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;

