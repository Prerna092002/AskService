const express = require('express');
const router = express.Router();
const User = require('../app/models/user_schema');
const passport = require('passport');


router.get('/', function (req, res) {
    return res.render('home');
});



router.get('/register', function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.render('./auth/workers/register');
});

router.post('/register', async function (req, res) {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        const newUser = await User.create(req.body);
        console.log(newUser);
        return res.redirect('./login');
    }
    else {
        return res.render('./auth/workers/register', { error: 'Email already exists' });
    }
});


router.get('/login', function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.render('./auth/workers/login');
});



router.post('/login', passport.authenticate(
    'local',
    {
        failureRedirect: '/login',
    }
), function (req, res) {
    console.log("session connected");
    return res.redirect('/');
})

module.exports = router;