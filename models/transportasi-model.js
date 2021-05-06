const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Transportasi = new Schema({
    kendaraan: { type: String, required: true },
    tipe: { type: String, required: true },
    merk: { type: String, required: true },
    nomorPolisi: { type: String, required: true },
    bahanBakar: { type: String, required: true },
    pemilik: { type: String, required: true },
    alamat: { type: String, required: true },
    nomorRangka: { type: String, required: true },
    pajak: { type: Boolean, required: true },
    kilometer: { type: Number, required: true },
    hargaBeli: { type: Number, required: true },
    hargaJual: { type: Number, required: true },
    tahun: { type: Number, required: true }
}, { timestamps: true }, )
module.exports = mongoose.model('transportations', Transportasi)