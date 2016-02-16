'use strict'

import express from 'express';
import config from './config';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import { notFound } from './httpErrors';
import basicAuth from './middlewares/basicAuthMiddleware';

var userRoute = require('./routes/userRoute');

// mongoDB
mongoose.connect(config.mongoUri);

// setup express
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());  // add body parser

// middleware
//app.use(basicAuth(config.username, config.password));

app.use('/api', userRoute);

// for all other routes => Not Found
app.get('/*', (req, res) => {
    res.status(404)
       .json(notFound())
});

// listen for port
const server = app.listen(config.port, function() {
    console.log(`Server listening on port: ${server.address().port}`);
});
