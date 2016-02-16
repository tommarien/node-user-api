var express = require('express');
var UserModel = require('../models/userModel');
import userMapper from '../mappers/userMapper';
import { notFound } from '../httpErrors';
import userResourceValidatorMiddleware from '../middlewares/userResourceValidator';

var router = express.Router();

router.get('/users', function (req, res, next) {
    UserModel.find()
        .then((users) => {
            const resources = users.map(user => userMapper.map(user));
            res.json(resources);
        })
        .catch((err) => {
            next(err)
        });
});

router.get('/users/:id', function (req, res, next) {
    GetUserById(req.params.id)
        .then((user) => {
            // is user found?
            if (!user) {
                return res.status(404)
                    .json(notFound());
            }

            const resource = userMapper.map(user);
            res.json(resource);
        })
        .catch((err) => {
            next(err)
        });
});

router.post('/users', userResourceValidatorMiddleware, function (req, res, next) {
    const user = createUser(req.body);

    user.save()
        .then((user)=> {
            res.status(201);
            res.header('Location', `http://localhost:3000/api/users/${user._id}`);
            res.json(userMapper.map(user));
        })
        .catch((err)=> {
            return next(err)
        });
});

router.put('/users/:id', userResourceValidatorMiddleware, (req, res, next) => {

    UserModel.findOne({_id: req.params.id})
        .then((user) => {
            // is user found?
            if (!user) {
                res.status(404).json(notFound());
                return;
            }

            // update user
            user = updateUser(req.body, user);

            return SaveP(user);
        })
        .then((storedUser)=> {
            if (storedUser) {
                var resource = userMapper.map(storedUser);
                res.status(200)
                    .json(resource);
            }
        })
        .catch((err) => {
            next(err)
        });
});

router.delete('/users/:id', (req, res, next) => {

    UserModel.findOne({_id: req.params.id})
        .then((user) => {
            if (!user) {
                res.status(204).send();
                return;
            }

            return user.remove();
        })
        .then((user)=> {
            if (user) {
                res.status(200)
                    .json(userMapper.map(user));
            }
        })
        .catch((err) => {
            next(err)
        });
});

// handle method not allowed for all other routes
router.all('/users/*', (req, res) => {
    res.status(405)
        .send('test');
})

function createUser(resource, user) {
    var user = new UserModel();
    return updateUser(resource, user);
}

function updateUser(resource, user) {
    var nameParts = resource.name.split(' ');
    user.firstName = nameParts[0];
    user.lastName = nameParts[1];
    user.email = resource.email;

    if (resource.age)
        user.age = resource.age;
    if (resource.address)
        user.homeAddress.addressLine = resource.address;
    if (resource.city)
        user.homeAddress.city = resource.city;
    if (resource.zip)
        user.homeAddress.zip = resource.zip;

    return user;
}


function GetUserById(id) {
    return new Promise((resolve, reject)=> {
        UserModel.findOne({_id: id}, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

function SaveP(model) {
    return new Promise((resolve, reject)=> {
        model.save((err, result) => {
            if (err) return reject(err);
            return resolve(result);
        });
    });
}

module.exports = router;
