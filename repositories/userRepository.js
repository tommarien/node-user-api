'use strict'

const mongoose = require('mongoose');
const User = require('./../models/user');

class UserRepository {
    GetAllUsers() {
        return User.find().exec();
    };

    GetUserById(id) {
        return User.findOne({_id: id}).exec();
    };
}

module.exports = new UserRepository();
