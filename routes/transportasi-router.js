const express = require('express')
const TransportasiCtrl = require('../controllers/transportasi-ctrl')
const router = express.Router()
router.post('/create-transportasi', TransportasiCtrl.createTransportasi)
router.put('/update-transportasi', TransportasiCtrl.updateTransportasi)
// router.delete('/movie/:id', TransportasiCtrl.deleteMovie)
router.get('/transportasi/:id', TransportasiCtrl.getTransportasiById)
router.get('/transportasi', TransportasiCtrl.getTransportasi)
module.exports = router