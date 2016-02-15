'use strict'

const mongoose = require('mongoose');
const User = require('./../models/user');

class UserRepository {
    getAllUsers() {
        return User.find().exec();
    };

    getUserById(id) {
        return User.findOne({_id: id}).exec();
    };
}

module.exports = new UserRepository();
