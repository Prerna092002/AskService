const mongoose = require('mongoose');
// requiring multer
// multer will help us store file remotely or locally in this case locally
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads');

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'Customer' },
    avatar: {
        type: String,
    }
}, { timestamps: true });

// using multer to store the impage in the local machine inside specific folder path
// telling multer to store the impage into our local machine onto the destinatoion specified with the filename specified.
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});


// multer middleware to call the storage ooption.
// static functions: which will be available over whole calss
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', userSchema);
module.exports = User;