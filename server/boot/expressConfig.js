import express from 'express';
import config from '../config';
import logger from 'morgan';
import bodyParser from 'body-parser';

import errorHandler from '../middleware/errorHandler';
import userRoute from '../routes/userRoute';
import { NotFoundError } from '../httpErrors';

// setup express
const app = express();
//app.use(logger('dev'));
app.use(bodyParser.json());  // add body parser

// routes
app.use('/api', userRoute);

// for all other routes => Not Found
app.all('/*', (req, res, next) => {
    next(new NotFoundError());
});

// error handlers
app.use(errorHandler);

export default app;
