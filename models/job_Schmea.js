const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobSchema = new Schema({
    username: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: false },
    contact: { type: Number, required: true, unique: false },
    role: { type: String, default: 'customer' },
    age: { type: Number },
    exp: { type: Number },
    incomne: { type: Number }
}, { timestamps: true })

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;