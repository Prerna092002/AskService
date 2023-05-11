const User = require('../models/user_schema');

module.exports.register = async function (req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('./');
}


module.exports.signUp = async function (req, res) {
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
}

module.exports.signIn = async function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }

    return res.render('./auth/workers/login');
}

module.exports.createSession = async function (req, res) {
    console.log("session connected");
    return res.redirect('./auth/Customers/profile');
}


module.exports.logout = async function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}

module.exports.profile = async function (req, res) {
    const user = await User.findById(req.params.id);

    if (!user) {
        console.log("user not found");
        return;
    }

    return res.render('./Customers/profile', {
        user: user,
    });
}

module.exports.update = async function (req, res) {
    const user = await User.findById(req.params.id);

    if (!user) {
        console.log("user not found");
        return;
    }

    return res.render('./Customers/profileUpdate', {
        user: user,
    });
}

