const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user_controllers');


router.get('/register', userController.register);

router.post('/register', userController.signUp);

router.get('/login', userController.signIn);

router.post('/login', passport.authenticate(
    'local',
    {
        failureRedirect: '/login',
    }
), userController.createSession);


router.get('/logout', userController.logout);

router.get('/updatePass', function (req, res) {

});

router.get('/profile/:id', userController.profile);

router.get('./updateUser', userController.update);

module.exports = router;