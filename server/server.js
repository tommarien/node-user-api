'use strict';

import express from 'express';
import config from './config';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import { notFound } from './httpErrors';
import basicAuth from './middlewares/basicAuthMiddleware';
import errorHandler from './middlewares/errorHandler';

/*
// exercise

//callback
var obj = {
    calcWithDelay(a, b, callback){
        setTimeout(()=> {
            if (!a || !b) return callback(new Error('Please provide values'));
            callback(undefined, a + b)
        }, 1000);
    },
    calcWithDelayP(a, b){
        return new Promise((resolve, reject)=> {
            setTimeout(()=> {
                if (!a || !b) return reject(new Error('Please provide values'));
                resolve(a + b)
            }, 1000);
        });
    }
};

obj.calcWithDelay(1, 3, function (err, result) {
    console.log(result);
});

// promise
obj.calcWithDelayP(1, 3)
    .then((result) => {
        console.log(result);
        return obj.calcWithDelayP(result, 3);
    })
    .then((final) => console.log('final: ', final))
    .catch((err) => console.log("Error", err));
*/


var userRoute = require('./routes/userRoute');

// mongoDB
mongoose.connect(config.mongoUri);
mongoose.Promise = global.Promise;

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

app.use(errorHandler);

// listen for port
const server = app.listen(config.port, function () {
    console.log(`Server listening on port: ${server.address().port}`);
});
