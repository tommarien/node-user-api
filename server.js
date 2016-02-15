const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const config = require('./config');
const userRouter = require('./routes/userRoute');
const mongoose = require('mongoose');

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome Api User')
});

app.use('/api/users', userRouter);

mongoose.connect(config.db.uri);

app.listen(config.port, function () {
    console.log(`Listening at ${config.port}`);
});
