const express = require('express')
const MenuCtrl= require('../controllers/menu-ctrl')
const router = express.Router()
router.get('/menus', MenuCtrl.getMenus)
module.exports = router