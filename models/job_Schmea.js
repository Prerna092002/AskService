const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads');

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
    isHired: { type: Boolean, required: true , default: false },

}, { timestamps: true });

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

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;