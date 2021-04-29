const Menu = require('../models/menu-model')
const { CONFIG } = require("../config");
const jwt = require('jsonwebtoken');
getMenus = (req, res) => {
    const { body, headers } = req
    if (headers.authorization) {
        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'Error Something default'
            })
        }
    }
    jwt.verify(headers.authorization.split(" ")[1], CONFIG.secretToken, async (err, decoded) => {
        await Menu.find({}, (err, menus) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
            if (!menus.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `Menu not found` })
            }
            return res.status(200).json({ success: true, data: menus })
        }).catch(err => console.log(err))
    })
}

module.exports = { getMenus }