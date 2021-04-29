const mongoose = require('mongoose')
mongoose
    .connect('mongodb://172.18.186.86:27020/development', { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection
module.exports = db