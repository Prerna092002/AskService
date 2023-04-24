const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://kashishgoyal961:PiVqOx22ekls2jkI@cluster905.4zypzwn.mongodb.net/AskService`);

const db = mongoose.connection;


db.on('error', console.error.bind(console, 'error in connecting to the database'));

db.once('open', function (err) {
    console.log("connected to the database");
});

module.exports = db;