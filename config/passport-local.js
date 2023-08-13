const passport = require('passport'); // importing passport

const LocalStrategy = require('passport-local').Strategy; // local strategy for authentication

const User = require('../models/user_schema'); // user data

// local strategy for passport authentication
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

// used to manage user session
// This function is used to serialize a user object into a format that can be stored in the session. 
passport.serializeUser(function (user, done) {
    return done(null, user.id);
});

// This function is used to retrieve the serialized user object from the session and deserialize it back into a user object.
passport.deserializeUser(async function (id, done) {
    try {
        const user = await User.findById(id);
        if (!user) {
            console.log("error in finding the user to authenticate");
            return;
        }

        return done(null, user); // store in req.user
    } catch (err) {
        console.log("error in authenticating user");
        console.log(err);
        return;
    }
});

// If the user is authenticated (i.e., logged in), it allows the request to proceed to the next middleware function
passport.checkauthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
}

// It sets the user object from the req object to the res.locals object, which makes the user object available to your view templates. 
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;