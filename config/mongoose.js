const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/codeial');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'error in connection with db'));

db.once('open',function(){
    console.log('Succesfully connected to db');
});
module.exports=db;