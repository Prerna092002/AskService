const mongoose = require('mongoose'); // importing mongoose library
const Schema = mongoose.Schema; // creating a reference to the schema class

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads');

// defined a job schema
const jobSchema = new Schema({
    username: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: false },
    contact: { type: Number, required: true, unique: false },
    role: { type: String, default: 'customer' },
    age: { type: Number },
    exp: { type: Number },
    income: { type: Number },
    avatar: {
        type: String,
    },
    isHired: { type: Boolean, required: true, default: false },

}, { timestamps: true }); // to add createdAt and updatedAt


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});


jobSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
jobSchema.statics.avatarPath = AVATAR_PATH;

const Job = mongoose.model('Job', jobSchema); // creating a mongoose model
module.exports = Job; //exporting the model