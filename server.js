require('dotenv');

const express = require("express");
const app = express();
const path = require('path');

const expressLayout = require('express-ejs-layouts');

const db = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');

//ASSETS
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));



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
      mongoUrl: 'mongodb+srv://kashishgoyal961:PiVqOx22ekls2jkI@cluster905.4zypzwn.mongodb.net/AskService',
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





app.listen(8080, function (req, res, err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("server is running on port no 8080");
  }
});
