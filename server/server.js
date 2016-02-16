var express = require('express');
var config = require('./config');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var httpErrors = require('./httpErrors');

var userRoute = require('./routes/userRoute');

// mongoDB
mongoose.connect(config.mongoUri);

// setup express
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());  // add body parser
app.use('/api', userRoute);

// for all other routes => Not Found
app.get('/*', (req, res) => {
    res.status(404)
       .json(httpErrors.notFound())
});

// listen for port
var server = app.listen(config.port, function() {
    console.log(`Server listening on port: ${server.address().port}`);
});
