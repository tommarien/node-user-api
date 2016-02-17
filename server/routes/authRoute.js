import express from 'express';
import { MethodNotAllowedError, BadRequestError, UnauthorizedError } from '../httpErrors';
import UserModel from '../models/userModel';
import { encrypt } from '../services/encryptutils';
import jwtToken from '../services/jwtToken';
import moment from 'moment';

const router = express.Router();

router.post('/auth/login', (req, res, next) => {
    const validationResult = validateLogin(req.body);

    if (!validationResult.isValid)
        return next(new BadRequestError(validationResult));

    const apiKeyWithoutPrefix = req.body.apiKey.startsWith('API-') ? req.body.apiKey.substr(4) : req.body.apiKey;

    UserModel.findOne({'apiKeys.encryptedKey': encrypt('SHA256', apiKeyWithoutPrefix)})
        .then((user)=> {
            if (!user) throw new UnauthorizedError();

            const payload = {
                sub: 12242344,
                iat: moment().valueOf(),
                iis: 'euri:bootcamp',
                exp: moment().add('minutes', 1).valueOf(),
                name: `${user.firstName} ${user.lastName}`,
                userId: user._id,
                role: 'admin'
            };

            const resource = {
                accessToken: jwtToken.encode(payload),
                tokenType: 'bearer'
            };

            return res.json(resource);
        })
        .catch((err)=> next(err));
});

router.all('/auth/*', (req, res, next) => {
    next(new MethodNotAllowedError())
});

function validateLogin(body) {
    const validationResult = [];

    if (!body.apiKey) {
        validationResult.push({
            key: 'apiKey',
            error: 'is required'
        });
    }

    validationResult.isValid = false;
    if (validationResult.length == 0)
        validationResult.isValid = true;

    return validationResult;
};

export default router;