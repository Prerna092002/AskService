const express = require('express');
const router = express.Router();
const User = require('../models/user_schema');
const passport = require('passport');
const customerController = require('../controllers/customer_controllers');


router.get('/cHome', function (req, res) {
    return res.render('./Customers/cHome');
});