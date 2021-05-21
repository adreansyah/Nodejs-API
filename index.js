const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const authRouter = require('./routes/auth-router');
const movieRouter = require('./routes/movie-router');
const credentials = require('./routes/users-credential-router');
const menus = require('./routes/menu-router');
const transportasi = require('./routes/transportasi-router');
const app = express();
const apiPort = 10000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/public' })
});
app.use('/api', authRouter);
app.use('/api', movieRouter);
app.use('/api', credentials);
app.use('/api', menus);
app.use('/api', transportasi);
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));