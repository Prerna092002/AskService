require('dotenv');

const express = require("express");
const app = express();
const path = require('path');

const flash = require('connect-flash');
const customWare = require('./config/middelware');

const expressLayout = require('express-ejs-layouts');

const db = require('./config/mongoose');

app.use('/uploads', express.static(__dirname + '/uploads'));


const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');

//ASSETS
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// to permamnently store the session
const MongoStore = require('connect-mongo');
app.use(session({
  name: 'AskService',
  secret: "babu",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: (1000 * 60 * 100)
  },
  store: MongoStore.create(
    {
      mongoUrl: 'mongodb+srv://KUNAL:KUNAL9900@mernapp.oaibt56.mongodb.net/AskService',
      dbName: 'db'
    },
    function (err) {
      console.log(err || 'connect-mongo done');
    }
  )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customWare.setFlash);



app.use('/', require('./routes'));

app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs');





app.listen(8080, function (req, res, err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("server is running on port no 8080");
  }
});
