require('dotenv')
const express = require("express");
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const port = process.env.PORT || 8080;

const db = require('./app/config/mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./app/config/passport-local');

//ASSETS
app.use(express.static('public'));



app.use(express.urlencoded({ extended: true }));


// to permamnently store the session
const MongoStore = require('connect-mongo');
app.use(session({
  name: 'AskService',
  secret: "blabla",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: (1000 * 60 * 100)
  },
  store: MongoStore.create(
    {
      mongoUrl: 'mongodb://127.0.0.1:27017/AskService',
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

app.use('/', require('./routes'));

app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs');


app.listen(port, function (req, res, err) {
  if (err) {
    console.log(err);
  } else {
    console.log("server is running on port 8080");
  }
});
