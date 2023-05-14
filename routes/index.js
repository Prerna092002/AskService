const express = require('express');
const router = express.Router();
const User = require('../models/user_schema');
const Job = require('../models/job_Schmea')
const passport = require('passport');
const nodemailer = require('nodemailer');
const notifier = require('node-notifier');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'serviceask54@gmail.com',
		pass: 'oexmuvpzygahfchw'
	},
	port: 465,
	host: 'smtp.gmail.com',
	secure: false
});


router.get('/', function (req, res) {
    return res.render('home');
});


router.get('/cHome', async function (req, res) {
    const jobs = await Job.find({});
    return res.render('./Customers/cHome', {
        jobs: jobs
    });
});

router.get('/jobProfile/:role', async function (req, res) {
    const jobs = await Job.find({});
    const role = req.params.role;
    return res.render('./Customers/jobProfiles', {
        jobs: jobs,
        role:role
    });
})

router.post('/sendMail', async function (req, res) {

    const {email} = req.body;
    console.log(email)
    try {
        let result = await transporter.sendMail({
            from: 'serviceask54@gmail.com', // sender address
            to: email, // list of receivers
            subject: 'You have new invitation for a job', // Subject line
            text: `email: ${req.user.email}`
        });
         notifier.notify({
            title: 'message',
            message: 'email sent successfully',
            sound: true
          });

          return res.redirect('back');
          
    } catch (e) {
        console.log(e);
         notifier.notify({
            title: 'an error occured',
          });

          return res.redirect('back');
    }
	
})

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
    return res.redirect('./');
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

router.post('/applyjob', async function (req, res) {
    try {
        const job = await Job.create(req.body);
        console.log(job);
        return res.redirect('./');

    } catch (e) {
        console.log("error in creating a job", e);
        return;
    }
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