const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {
    return res.render('home');
})
router.get('/login', function (req, res) {
    res.render('./auth/workers/login');
})

module.exports = router;