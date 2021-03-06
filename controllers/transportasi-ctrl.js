const Transportasi = require('../models/transportasi-model')

createTransportasi = (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a data creators',
        })
    }
    const transportasi = new Transportasi(body)
    if (!transportasi) {
        return res.status(400).json({ success: false, error: err })
    }
    transportasi
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: transportasi._id,
                message: 'Transportasi created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Transportasi not created!',
            })
        })
}

updateTransportasi = async (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    Transportasi.findOne({ _id: body.id }, (err, transportasi) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Transportasi not found!',
            })
        }
        transportasi.kendaraan = body.kendaraan
        transportasi.tipe = body.tipe
        transportasi.merk = body.merk
        transportasi.nomorPolisi = body.nomorPolisi
        transportasi.bahanBakar = body.bahanBakar
        transportasi.pemilik = body.pemilik
        transportasi.alamat = body.alamat
        transportasi.nomorRangka = body.nomorRangka
        transportasi.pajak = body.pajak
        transportasi.kilometer = body.kilometer
        transportasi.hargaBeli = body.hargaBeli
        transportasi.hargaJual = body.hargaJual
        transportasi.tahun = body.tahun
        transportasi
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: transportasi._id,
                    message: 'Transportasi updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Transportasi not updated!',
                })
            })
    })
}

deleteTransportasi = async (req, res) => {
    await Movie.findOneAndDelete({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }

        return res.status(200).json({ success: true, data: movie })
    }).catch(err => console.log(err))
}

getTransportasiById = async (req, res) => {
    await Transportasi.findOne({ _id: req.params.id }, (err, transportasi) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!transportasi) {
            return res
                .status(404)
                .json({ success: false, error: `Transportasi not found` })
        }
        return res.status(200).json({ success: true, data: transportasi })
    }).catch(err => console.log(err))
}

getTransportasi = async (req, res) => {
    await Transportasi.find({}, (err, transportasi) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!transportasi.length) {
            return res
                .status(404)
                .json({ success: false, error: `Transportasi not found` })
        }
        return res.status(200).json({ success: true, data: transportasi })
    }).catch(err => console.log(err))
}

module.exports = {
    createTransportasi,
    updateTransportasi,
    deleteTransportasi,
    getTransportasi,
    getTransportasiById,
}