const express = require('express');
const router = express.Router();
const User = require('../app/models/user_schema');

router.get('/', function (req, res) {
    return res.render('home');
})
router.get('/login', function (req, res) {
    res.render('./auth/workers/login');
})

router.get('/register', function (req, res) {
    res.render('./auth/workers/register');
})

router.post('/register', async function (req, res) {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        const newUser = User.create(req.body);
        console.log(newUser);
    }
    else {
        return res.render('./auth/workers/register', { error: 'Email already exists' });
    }
});


module.exports = router;