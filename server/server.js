import express from 'express';
import config from './config';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';

import errorHandler from './middleware/errorHandler';
import userRoute from './routes/userRoute';
import { NotFoundError } from './httpErrors';
import seedData from './seedData';

// mongoDB
mongoose.connect(config.mongoUri);
mongoose.Promise = global.Promise   // let mongoose use ES6 promises
seedData(); // create init data in db

// setup express
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());  // add body parser

// routes
app.use('/api', userRoute);

// for all other routes => Not Found
app.all('/*', (req, res, next) => {
    next(new NotFoundError());
});

// error handlers
app.use(errorHandler);

// listen for port
var server = app.listen(config.port, function() {
    console.log(`Server listening on port: ${server.address().port}`);
});
