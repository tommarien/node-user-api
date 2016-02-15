const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userRepository = require('./../repositories/userRepository');
const userMapper = require('./../mappers/userMapper');
const User = require('./../models/user');
const _ = require('underscore');

const validate = require("express-jsonschema").validate;

// Create a json scehma
const UserResourceSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            required: true,
        },
        email: {
            type:'string',
            required: true,
        }
    }
};

router.get('/', (req, res, next)=> {
    userRepository.getAllUsers()
        .then((users)=> {
            const resources = _.map(users, (user)=> {
                return userMapper.MapFrom(user);
            });
            res.send(resources);
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/:id', (req, res, next)=> {
    userRepository.getUserById(req.params.id)
        .then((user)=> {
            if (!user) {
                return res
                    .status(404)
                    .send();
            }

            const resource = userMapper.MapFrom(user);

            return res.send(resource);
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/', validate({body: UserResourceSchema}), (req, res, next)=> {

    console.log('blah');

    const names = req.body.name.split(' ');

    var user = new User({
        firstName: names[0],
        lastName: names[1],
        age: req.body.age,
        email: req.body.email,
        homeAddress: {
            addressLine: req.body.address,
            city: req.body.city,
            zip: req.body.zip,
        }
    });

    user.save()
        .then((user)=> {
            const resource = userMapper.MapFrom(user);

            res
                .status(201)
                .location(`/api/users/${user._id}`)
                .send(resource);
        })
        .catch((err) => {
            next(err);
        });
});

router.put('/:id', validate({body: UserResourceSchema}), (req, res, next)=> {
    userRepository.getUserById(req.params.id)
        .then((user)=> {
            if (!user) {
                return res
                    .status(404)
                    .send();
            }

            const names = req.body.name.split(' ');

            user.firstName = names[0];
            user.lastName = names[1];
            user.email = req.body.email;

            if (req.body.age)
                user.age = req.body.age;

            if (req.body.address)
                user.homeAddress.addressLine = req.body.address;

            if (req.body.city)
                user.homeAddress.city = req.body.city;

            if (req.body.zip)
                user.homeAddress.zip = req.body.zip;

            user.save();

            const resource = userMapper.MapFrom(user);

            return res.send(resource);
        })
        .catch((err) => {
            next(err);
        });
});

router.delete('/:id', (req, res, next)=> {
    userRepository.getUserById(req.params.id)
        .then((user)=> {

            if (!user) {
                return res
                    .status(204)
                    .send();
            }

            user.remove();

            const resource = userMapper.MapFrom(user);

            return res.send(resource);
        })
        .catch((err) => {
            next(err);
        });
});

router.all('/*', (req, res)=> {
    return res
        .status(405)
        .send();
});

module.exports = router;
