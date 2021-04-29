const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Menu = new Schema(
    {
        key: { type: String, required: true },
        icon: { type: String, required: true },
        label: { type: String, required: true },
        link: { type: String, required: true },
        children: { type: [Array], required: true }
    },
    { timestamps: true },
)
module.exports = mongoose.model('menus', Menu)
