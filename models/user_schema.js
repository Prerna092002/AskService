const mongoose = require('mongoose'); // importing mongoose library
const Schema = mongoose.Schema; // creating a reference to the schema class

// multer will help us store file remotely or locally in this case locally
// requiring multer    
const multer = require('multer');
const path = require('path');
// path where avatars are going to be stored
const AVATAR_PATH = path.join('/uploads');

// defined a user schema
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'Customer' },
    avatar: {
        type: String,
    }
}, { timestamps: true }); // to add createdAt and updatedAt

// using multer to store the image in the local machine inside specific folder path
// telling multer to store the impage into our local machine onto the destinatoion specified with the filename specified.
let storage = multer.diskStorage({
    // setting the destination path for the image
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    // generating file name for the image
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});


// multer middleware to call the storage option.
// static functions: which will be available over whole calss
userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', userSchema); // creating a mongoose model
module.exports = User; //exporting the model