import config from './config';

export function internalServerError(err) {
    var errorMessage = {
        'code': 'Internal Server Error',
        'message': 'Oops! something went wrong!'
    };
    if (config.env != 'prod') {
        errorMessage.detail = {
            'error': err.message,
            'stack': err.stack
        }
    }
};

export function notFound() {
    return {
        'code': 'Not Found',
        'message': 'The resource was not found'
    };
};

export function badRequest(details) {
    return {
        'code': 'Bad Request',
        'message': 'One or more validations failed',
        'details': details
    };
};
