const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const config = require('./config');
const userRouter = require('./routes/userRoute');
const mongoose = require('mongoose');
const jsonSchemaValidator = require('./middleware/jsonSchemaValidator');
const errorHandler = require('./middleware/errorHandler');

mongoose.connect(config.db.uri);

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Welcome Api User')
});

app.use('/api/users', userRouter);

app.all('*', (req,res)=> {
    res.status(404)
    .json(
    {
        "code": "Not Found",
        "message": "The requested resource was not found"
    });
});

app.use(jsonSchemaValidator);
app.use(errorHandler);

app.listen(config.port, function () {
    console.log(`Listening at ${config.port}`);
});
