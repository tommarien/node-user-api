var express = require('express');
var userMapper = require('../mappers/userMapper');
var UserModel = require('../models/userModel');
var userValidator = require('../validators/userValidator');
var httpErrors = require('../httpErrors');
var userResourceValidatorMiddleware = require('./../middlewares/userResourceValidator');

var router = express.Router();

router.get('/users', function (req, res) {
    UserModel.find(function (err, users) {
        if (err) {
            return res.status(500)
                .json(httpErrors.internalServerError(err));
        }
        var resources = users.map(user => userMapper.map(user));
        res.status(200)
            .json(resources);
    });
});

router.get('/users/:id', function (req, res) {
    UserModel.findOne({_id: req.params.id}, (err, user) => {
        if (err) {
            return res.status(500)
                .json(httpErrors.internalServerError(err));
        }

        var resource = userMapper.map(user);
        res.status(200)
            .json(resource);
    });
});

router.post('/users', userResourceValidatorMiddleware, function (req, res) {

    // create new user
    var user = createUser(req.body);

    // and save to db
    user.save((err) => {
        if (err) {
            return res.status(500)
                .json(httpErrors.internalServerError(err));
        }
        res.status(201);  // created
        res.header('Location', `http://localhost:3000/api/users/${user._id}`)
        res.json(userMapper.map(user));
    })
});

router.put('/users/:id', userResourceValidatorMiddleware, (req, res) => {

    // find and update
    UserModel.findOne({_id: req.params.id}, (err, user) => {
        if (err) {
            return res.status(500)
                .json(httpErrors.internalServerError(err));
        }

        // is user found?
        if (!user) {
            return res.status(404)
                .json(httpErrors.notFound());
        }

        // update user
        user = updateUser(req.body, user);

        // save
        user.save(err => {
            if (err) {
                return res.status(500)
                    .json(httpErrors.internalServerError(err));
            }
            var resource = userMapper.map(user);
            res.status(200)
                .json(resource);
        })
    });
});

router.delete('/users/:id', (req, res) => {
    UserModel.findOne({_id: req.params.id}, (err, user) => {
        if (err) {
            return res.status(500)
                .json(httpErrors.internalServerError(err));
        }
        if (!user) {
            return res.status(204).send();
        }
        user.remove((err) => {
            if (err) {
                return res.status(500)
                    .json(httpErrors.internalServerError(err));
            }
            res.status(200)
                .json(userMapper.map(user));
        })
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

module.exports = router;
