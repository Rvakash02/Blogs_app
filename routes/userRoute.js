const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('signup', {title : 'signup'});
});

router.post('/', userController.handleUserSignup);

router.get('/login', (req, res) => {
    res.render('login', {title : 'login'});
});
router.post('/login', userController.handleUserLogin);

router.get('/logout', (req, res) => {
    res.clearCookie('uid');
     res.redirect('/');
})

module.exports = router ;