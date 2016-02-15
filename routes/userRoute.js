const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userRepository = require('./../repositories/userRepository');
const userMapper = require('./../mappers/userMapper');
const User = require('./../models/user');

const _ = require('underscore');

router.get('/', (req, res, next)=> {
    userRepository.GetAllUsers()
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
    userRepository.GetUserById(req.params.id)
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

router.post('/', (req, res, next)=> {

    const names = req.body.name.split(' ');

    var user = new User({
        firstName:names[0],
        lastName :names[1],
        age: req.body.age || 0,
        email: req.body.email,
        homeAddress:{
            addressLine: req.body.address || '',
            city: req.body.city || '',
            zip: req.body.zip || '',
        }
    });

    user.save()
        .then((user)=> {
            const resource = userMapper.MapFrom(user);
            res.send(resource);
        })
        .catch((err) => {
            next(err);
        });
});

router.put('/:id', (req, res, next)=> {

});

router.delete('/:id', (req, res, next)=> {

});

module.exports = router;
