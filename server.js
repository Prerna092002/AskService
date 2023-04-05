require('dotenv')
const express = require("express");
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const port = process.env.PORT || 8080;


//ASSETS
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.render('home');
});
app.get('/about',(req,res)=>{
  res.render('about');
})
//setting up template

app.use(expressLayout)
app.set('views', path.join(__dirname,'/resources/views'))
app.set('view engine', 'ejs');


app.listen(port, function (req, res, err) {
  if (err) {
    console.log(err);
  } else {
    console.log("server is running on port 8080");
  }
});
