const express = require('express')
const Credentials = require('../controllers/users-credential-ctrl')
const router = express.Router()
router.post('/create-credential', Credentials.createCredentials)
router.get('/credential', Credentials.findCredentialUsers)
module.exports = router