const mongoose = require('mongoose'); // importing mongoose library.

// establishing a connection to the mongoDB database.
mongoose.connect(`mongodb+srv://kashishgoyal961:kashish905@askservice.qghlvoe.mongodb.net/AskService`);

const db = mongoose.connection; // storing a reference of the database connection


db.on('error', console.error.bind(console, 'error in connecting to the database')); // event listener for error

db.once('open', function (err) { // event listener for the open event on the database connection.
    console.log("connected to the database");
});

module.exports = db;    // exporting the database