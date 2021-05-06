const express = require('express')
const TransportasiCtrl = require('../controllers/transportasi-ctrl')
const router = express.Router()
router.post('/create-transportasi', TransportasiCtrl.createTransportasi)
    // router.put('/movie/:id', TransportasiCtrl.updateMovie)
    // router.delete('/movie/:id', TransportasiCtrl.deleteMovie)
router.get('/transportasi/:id', TransportasiCtrl.getTransportasiById)
router.get('/transportasi', TransportasiCtrl.getTransportasi)
module.exports = router