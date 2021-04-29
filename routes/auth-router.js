const express = require('express')
const Authentication = require('../controllers/auth-ctrl')
const router = express.Router()
router.post('/create-user', Authentication.createUser)
router.post('/login', Authentication.findOneUsers)
router.post('/refresh-token', Authentication.refreshToken)
module.exports = router