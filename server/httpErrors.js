import httpStatus from 'http-status-codes';

export class HttpError extends Error {
    constructor(statusCode, message, details) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.payload = {
            code: httpStatus.getStatusText(statusCode),
            message: message
        }
        if (details) {
            this.payload.details = details;
        }
    }
}

export class NotFoundError extends HttpError {
    constructor() {
        super(httpStatus.NOT_FOUND, 'The resource was not found');
    }
}

export class MethodNotAllowedError extends HttpError {
    constructor() {
        super(httpStatus.METHOD_NOT_ALLOWED, 'The method was not supported on this route');
    }
}

export class BadRequestError extends HttpError {
    constructor(details) {
        super(httpStatus.BAD_REQUEST, 'One or more validations failed', details);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(details) {
        super(httpStatus.UNAUTHORIZED, 'Unauthorized, need to ', details);
    }
}
