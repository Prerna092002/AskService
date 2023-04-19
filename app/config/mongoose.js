const mongoose = require('mongoose');
mongoose.connect(`mongodb://127.0.0.1:27017/AskService`);

const db = mongoose.connection;


db.on('error', console.error.bind(console, 'error in connecting to the database'));

db.once('open', function (err) {
    console.log("connected to the database");
});

module.exports = db;