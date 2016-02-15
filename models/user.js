const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    homeAddress: {
        addressLine: String,
        city: String,
        zip: String
    }
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
