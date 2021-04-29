
const { CONFIG } = require("../config");
const jwt_decode = require("jwt-decode");
const UserCredentials = require('../models/users-credential-model')
const jwt = require('jsonwebtoken');
createCredentials = (req, res) => {
    const { body, headers } = req
    if (headers.authorization) {
        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a credential',
            })
        }
        const credential = new UserCredentials(body)
        if (!credential) {
            return res.status(400).json({ success: false, error: err })
        }
        credential
            .save()
            .then(() => {
                return res.status(201).json({
                    success: true,
                    id: credential._id,
                    message: 'Credentials created!',
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'Credentials not created!',
                })
            })
    } else {
        return res.status(401).json({
            success: false,
            data: null,
            message: 'unauthorized'
        })
    }
}
findCredentialUsers = (req, res) => {
    const { body, headers } = req
    if (headers.authorization) {
        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'Error Something default'
            })
        }
        jwt.verify(headers.authorization.split(" ")[1], CONFIG.secretToken, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    data: null,
                    message: 'unauthorized Token Expiry'
                })
            }
            const decode = jwt_decode(headers.authorization.split(" ")[1]);
            UserCredentials.findOne({ email: decode.user.username }, async (err, payload) => {
                return res.status(200).json({
                    success: true, data: payload
                })
            })
        })
    }
    else {
        return res.status(401).json({
            success: false,
            data: null,
            message: 'unauthorized'
        })
    }
}

module.exports = { findCredentialUsers, createCredentials }