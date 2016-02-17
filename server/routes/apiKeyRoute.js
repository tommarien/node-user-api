import express from 'express';
import UserModel from '../models/userModel';
import { NotFoundError} from '../httpErrors';
import apiKeyGenerator from '../services/apiKeyGenerator';
import _ from 'underscore';
import { encrypt } from '../services/encryptutils';

const router = express.Router();

router.get('/users/:id/keys', (req, res, next)=> {

    UserModel.findOne({_id: req.params.id})
        .then((user)=> {
            if (!user) throw new NotFoundError();

            const apiKeys = user.apiKeys.map(key=> {
                return {name: key.name};
            });

            return res.json(apiKeys);
        })
        .catch((err)=> next(err));
});

router.post('/users/:id/keys', (req, res, next)=> {

    let apiKey;

    UserModel.findOne({_id: req.params.id})
        .then((user)=> {
            if (!user) throw new NotFoundError();

            apiKey = apiKeyGenerator.generate();

            var key = {
                name: req.body.name,
                encryptedKey: encrypt('SHA256', apiKey),
            };

            user.apiKeys.push(key);

            return user.save();
        })
        .then(()=> {
            res.json({
                key: `API-${apiKey}`,
                name: req.body.name,
            })
        })
        .catch((err)=> next(err));
});

router.delete('/users/:id/keys/:name', (req, res, next)=> {
    UserModel.findOne({_id: req.params.id})
        .then((user)=> {
            if (!user) throw new NotFoundError();

            user.apiKeys = _.reject(user.apiKeys, x=>x.name == req.params.name);

            return user.save();
        })
        .then((user)=> {
            res.status(204).send();
        })
        .catch((err)=> next(err));
});

export default router;