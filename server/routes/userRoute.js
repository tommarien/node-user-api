import express from 'express';
import userMapper from '../mappers/userMapper';
import UserModel from '../models/userModel';
import userValidator from '../validators/userValidator';
import { NotFoundError, BadRequestError } from '../httpErrors';
import jwtTokenAuthentication from '../middleware/jwtTokenAuthentication';

var router = express.Router();

// user validation middleware
function validateUser(req, res, next) {
    // validate
    var result = userValidator.validate(req.body);
    if (!result.isValid) {
        return next(new BadRequestError(result));
    }
    next();
}

router.get('/users', function (req, res, next) {
    let page = Number(req.query.page || 0);
    let pageSize = Number(req.query.pageSize || 20);
    let sort = req.query.sort || '';

    if (page < 0) page = 0;
    if (pageSize < 1) pageSize = 20;

    if (sort.match(/[+|-]?name/)) {
        if (sort.startsWith('-'))
            sort = "-firstName -lastName";
        else {
            sort = "firstName lastName"
        }
    }

    if (sort.match(/[+|-]?address/)) {
        sort = sort.replace('address', 'homeAddress.addressLine')
    }

    if (sort.match(/[+|-]?city/)) {
        sort = sort.replace('city', 'homeAddress.city')
    }

    if (sort.match(/[+|-]?zip/)) {
        sort = sort.replace('zip', 'homeAddress.zip')
    }

    UserModel.find()
        .sort(sort)
        .skip(pageSize * page)
        .limit(pageSize)
        .then(function (users) {
            // map and return list of users
            var resources = users.map(user => userMapper.map(user));
            res.json(resources);
        })
        .catch(function (err) {
            next(err);
        })
});

router.get('/users/:id', function (req, res, next) {

    // find the specified user
    UserModel.findOne({_id: req.params.id})
        .then(user => {

            // user not found
            if (!user) {
                throw new NotFoundError();
            }

            // map and return
            var resource = userMapper.map(user);
            res.json(resource);
        })
        .catch(function (err) {
            next(err);
        });
});

router.post('/users', jwtTokenAuthentication, validateUser, function (req, res, next) {

    console.log('user:', req.user.name);
    // create new user
    var user = createUser(req.body);

    // and save to db
    user.save()
        .then(user => {
            res.status(201);  // created
            res.location(`http://localhost:3000/api/users/${user._id}`)
            res.json(userMapper.map(user));
        })
        .catch(function (err) {
            next(err);
        });
});

router.put('/users/:id', jwtTokenAuthentication, validateUser, (req, res, next) => {

    // find and update
    UserModel.findOne({_id: req.params.id})
        .then(user => {

            // user not found
            if (!user) {
                throw new NotFoundError();
            }

            // update user
            user = updateUser(req.body, user);

            // save
            return user.save();
        })
        .then(user => {
            // map and return
            var resource = userMapper.map(user);
            res.status(200)
                .json(resource);
        })
        .catch(function (err) {
            next(err);
        });
});

router.delete('/users/:id', jwtTokenAuthentication, (req, res, next) => {
    UserModel.findOne({_id: req.params.id})
        .then(user => {
            if (!user) return;  // not found
            return user.remove();
        })
        .then(user => {
            if (!user) {
                // no content
                res.status(204).send();
            }
            else {
                // resource deleted
                res.status(200).json(userMapper.map(user));
            }
        })
        .catch(function (err) {
            next(err);
        });
});

// helpers methods

function createUser(resource) {
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
