import express from 'express';
import { MethodNotAllowedError, BadRequestError, UnauthorizedError } from '../httpErrors';
import UserModel from '../models/userModel';
import { encrypt } from '../services/encryptutils';
import jwtToken from '../services/jwtToken';

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
                iat: 1232312,
                iis: 'euri:bootcamp',
                name: `${user.firstName} ${user.lastName}`,
                userId: user._id
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