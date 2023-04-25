const express = require('express');
const router = express.Router();
const User = require('../models/user_schema');
const passport = require('passport');


router.get('/', function (req, res) {
    return res.render('home');
});


router.get('/cHome', function (req, res) {
    return res.render('./Customers/cHome');
});

router.get('/register', function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }

    res.render('./auth/workers/register');
});

router.post('/register', async function (req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            const newUser = await User.create(req.body);
            console.log(newUser);
            return res.redirect('./login');
        }
        else {
            return res.render('./auth/workers/register', { error: 'Email already exists' });
        }
    } catch (err) {
        console.log(err);
        return res.redirect('/register');
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
    return res.redirect('./auth/Customers/profile');
});


router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
})


router.get('/wHome', function (req, res) {
    return res.render('./workers/wHome');
});

router.get('/about', function (req, res) {
    return res.render('./about');
});

router.get('/chatbot', function (req, res) {
    return res.render('./workers/chatbot');
})

router.get('/updatePass', function (req, res) {

});

router.get('/profile/:id', async function (req, res) {
    const user = await User.findById(req.params.id);

    if (!user) {
        console.log("user not found");
        return;
    }

    return res.render('./Customers/profile', {
        user: user,
    });
});

// router.get('./updateUser', async function (req, res) {
//     const user = await User.findById(req.params.id);

//     if (!user) {
//         console.log("user not found");
//         return;
//     }

//     return res.render('./Customers/profileUpdate', {
//         user: user,
//     });
// })

module.exports = router;