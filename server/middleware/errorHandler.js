import { HttpError } from '../httpErrors';
import config from '../config';
import httpStatus from 'http-status-codes';

export default function errorHandler(err, req, res, next) {

    const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    let payload = err.payload;

    // special case for 500 (internal server error)
    if (statusCode === httpStatus.INTERNAL_SERVER_ERROR) {
        payload = {
            'code': httpStatus.getStatusText(httpStatus.INTERNAL_SERVER_ERROR),
            'message': 'Oops! something went wrong!'
        };
        if (config.env != 'prod') {
            payload.detail = {
                'error': err.message,
                'stack': err.stack
            }
        }
    }

    // return http error code with json response
    return res.status(statusCode).json(payload);
}
