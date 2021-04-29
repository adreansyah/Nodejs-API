const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Credentials = new Schema(
    {
        firstName: { type: String, required: true },
        address: { type: String, required: true },
        lastName: { type: String, required: true },
        nik: { type: String, required: true },
        phone: { type: Number, required: true },
        email: { type: String, required: true }
    },
    { timestamps: true }
)
module.exports = mongoose.model('credentials', Credentials)