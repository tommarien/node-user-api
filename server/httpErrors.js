var config = require('./config');
module.exports = {
    internalServerError(err) {
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
    },

    notFound() {
        return {
            'code': 'Not Found',
            'message': 'The resource was not found'
        };
    },

    badRequest(details) {
        return {
            'code': 'Bad Request',
            'message': 'One or more validations failed',
            'details': details
        };
    }
}
