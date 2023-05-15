const express = require('express');
const router = express.Router();
const User = require('../models/user_schema');
const Job = require('../models/job_Schmea')
const passport = require('passport');
const nodemailer = require('nodemailer');
const notifier = require('node-notifier');

// for removing the file avatar
const path = require('path');
const fs = require('fs');

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

// home page
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
        role: role
    });
})

router.post('/sendMail', passport.checkauthentication, async function (req, res) {
    const { email } = req.body;
    const job = await Job.findOne({ email: email });
    console.log(email);
    try {
        let result = await transporter.sendMail({
            from: 'serviceask54@gmail.com', // sender address
            to: email, // list of receivers
            subject: 'You have new invitation for a job', // Subject line
            text: `Hey ${job.username}! we're exited to tell you that ${req.user.name} just hired you` // Message
        });
        console.log('email sent successfully');
        notifier.notify({
            title: 'message',
            message: `email seuccesfully sent to ${job.username}`,
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

router.post('/updateUser/:id', async function (req, res) {
    let id = req.params.id;
    if (req.user.id == req.params.id) {
        try {
            // finding the user of which we need to update the details.
            let user = await User.findById(req.params.id);
            // funciton from user schema
            // multer provides 2 things with req--> for params req.body like we have before n=but now they are via multer as our parser is not able to parse multipart data.
            // ans one is req,file-> wholde detail about file which is uploaded.
            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log("multer error in uploading the avatar");
                    return;
                }
                // updating
                user.name = req.body.name;
                user.email = req.body.email;
                if (req.file) {
                    // if user alread had an avatar and and that file exists in our system
                    if (user.avatar && fs.existsSync(path.join(__dirname, "..", user.avatar))) {
                        fs.unlinkSync(path.join(__dirname, "..", user.avatar));
                    }

                    // setting the path of avatar inside schema
                    user.avatar = User.avatarPath + "/" + req.file.filename;
                    console.log("pp updated");
                }
                user.save();
                return res.redirect(`/profile/${id}`);
            })
        } catch (err) {
            // req.flash('error', "error in updating the user");
            console.log(err);
            return;
        }
    } else {
        return re.status(401).send("unauthorize");
    }
});

module.exports = router;