import { internalServerError } from './../httpErrors';

export default (err, req, res, next)=> {
    console.log('boom');

    return res.status(500)
        .json(internalServerError(err));
};
