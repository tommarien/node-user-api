'use strict'

class UserResourceMapper {
    MapFrom(user) {
        return {
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            age: user.age,
            email: user.email,
            address: user.homeAddress.addressLine,
            city: user.homeAddress.city,
            zip: user.homeAddress.zip,
        };
    };
}

module.exports = new UserResourceMapper();
