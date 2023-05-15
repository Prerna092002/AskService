const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user_schema');


passport.use(new LocalStrategy({
    usernameField: 'email'
}, async function (email, password, done) {
    try {
        const user = await User.findOne({ email: email });

        if (!user || user.password != password) {
            console.log("Invalid Username/Password");
            console.log(user);
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        console.log("error in authenticating user");
        console.log(err);
        return;
    }

}));


passport.serializeUser(function (user, done) {
    return done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id);
        if (!user) {
            console.log("error in finding the user to authenticate");
            return;
        }

        return done(null, user);
    } catch (err) {
        console.log("error in authenticating user");
        console.log(err);
        return;
    }
});

passport.checkauthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;