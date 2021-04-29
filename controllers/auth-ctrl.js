const { CONFIG } = require('../config')

const User = require('../models/auth-model'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    tokenList = {}

createUser = (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a userName',
        })
    }
    const user = new User(body)
    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }
    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: 'UserName Created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Authentication is not created!'
            })
        })
}

findOneUsers = (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide parameter to find authorization'
        })
    }
    User.findOne({ username: body.username }, async (err, payload) => {
        if (payload) {
            bcrypt.compare(body.password, payload.password, function (err, result) {
                if (result) {
                    try {
                        const token = jwt.sign({ user: body }, CONFIG.secretToken, {
                            expiresIn: CONFIG.expiryToken
                        });
                        const refreshToken = jwt.sign({ user: body }, CONFIG.refreshToken, {
                            expiresIn: CONFIG.expiryRefreshToken
                        });
                        jwt.verify(token, CONFIG.secretToken, function (err, decoded) {
                            if (err) {
                                return res.status(401).json({ "error": true, "message": 'Unauthorized access.' });
                            }
                            const response = {
                                username: payload.username,
                                createdAt: payload.createdAt,
                                updatedAt: payload.updatedAt,
                                token,
                                refreshToken,
                                ...decoded
                            }
                            tokenList[refreshToken] = response
                            return res.status(200).json({
                                success: true, data: response
                            })
                        });
                    } catch (error) {
                        return res.status(401).json({
                            error,
                            data: null,
                            message: 'Account Unauthorized'
                        })
                    }
                }
                else {
                    return res.status(401).json({
                        success: false,
                        data: null,
                        message: 'Password Incorrect'
                    })
                }
            });
        }
        else {
            return res.status(401).json({
                success: false,
                data: null,
                message: 'Username password not found'
            })
        }
    })
}
refreshToken = (req, res) => {
    const { body } = req
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide parameter to find authorization'
        })
    }
    jwt.verify(body.refreshToken, CONFIG.refreshToken, function (err, decoded) {
        if (err) {
            return res.status(401).json({ "error": true, "message": 'Unauthorized access.' });
        }
        const token = jwt.sign({ user: decoded.user }, CONFIG.secretToken, {
            expiresIn: CONFIG.expiryToken
        });
        const refreshToken = jwt.sign({ user: decoded.user }, CONFIG.refreshToken, {
            expiresIn: CONFIG.expiryRefreshToken
        });
        const response = {
            ...decoded.user,
            createdAt: new Date(),
            updatedAt: new Date(),
            token,
            refreshToken
        }
        delete response.password
        tokenList[refreshToken] = response
        return res.status(200).json({
            success: true, data: response
        })
    })
}
module.exports = { createUser, findOneUsers, refreshToken }