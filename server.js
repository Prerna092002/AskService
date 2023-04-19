require('dotenv')
const express = require("express");
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const port = process.env.PORT || 8080;

const db = require('./app/config/mongoose')

//ASSETS
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
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
