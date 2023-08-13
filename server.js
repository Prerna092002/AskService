const express = require("express"); //requiring
const app = express(); // initializing the instance of express application
const path = require('path'); //  to work with files and directories

const flash = require('connect-flash'); // for flash messages
const customWare = require('./config/middelware'); // flash custome middelware

const expressLayout = require('express-ejs-layouts'); // used to enhance the rendering of ejs templates

const db = require('./config/mongoose'); // importing the database

app.use('/uploads', express.static(__dirname + '/uploads')); // multer file path

// Session & Authentication
const session = require('express-session'); // to manage user sessions
const passport = require('passport'); // authentication middleware
const passportLocal = require('./config/passport-local'); // local authentication strategy

// Aseets Files
app.use(express.static('public')); // middelware to serve static files.
app.use(express.urlencoded({ extended: true })); // helps to parse the data
app.use(express.json()); // parse nodemailer data



// to create a session
const MongoStore = require('connect-mongo'); // package for storing sessions in the database
app.use(session({
  name: 'AskService',
  secret: "babu",
  resave: false,  // wether the session should be saved back to session store even if it's not modified.
  saveUninitialized: false, // wether to save sessions which are new but not modified.
  cookie: {
    maxAge: (1000 * 60 * 100), // cookie age
  },
  store: MongoStore.create(
    {
      mongoUrl: 'mongodb+srv://kashishgoyal961:kashish905@askservice.qghlvoe.mongodb.net/AskService', // where session data wil store
      dbName: 'db'
    },
    function (err) {
      console.log(err || 'connect-mongo done');
    }
  )
}));

app.use(passport.initialize()); // initializes passport authentication middleware.
app.use(passport.session()); //session support for the passport. [serializer, deserializer]

app.use(passport.setAuthenticatedUser); //custom function to set authenticated user in locals.user to access it in the handlers.

app.use(flash()); // initializes flash middelware
app.use(customWare.setFlash); // setting the values of flash in req.locals


app.use('/', require('./routes'));  // routes


app.use(expressLayout); //using layout feature provided by express-ejs-layout
app.set('views', path.join(__dirname, '/resources/views')); // setting up views
app.set('view engine', 'ejs'); // setting the view engine.

// listening to the server
app.listen(8080, function (req, res, err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("server is running on port no:8080");
  }
});
