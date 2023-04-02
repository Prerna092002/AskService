const express=require('express');
const app=express();
const db = require('./config/mongoose');
app.use(express.static('./assets'));


app.set('view engine', 'ejs');
app.set('views', './views');


app.use('/', require('./routes'));

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.listen(3000,(req,res)=>{
    console.log('Server is running on port 3000');
})