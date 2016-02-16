class UserMapper {
    map(user) {
        const resource = {
            id: user._id,
            name: user.firstName + ' ' + user.lastName,
            age: user.age,
            email: user.email
        }
        if (user.homeAddress) {
            resource.address = user.homeAddress.addressLine;
            resource.city = user.homeAddress.city;
            resource.zip = user.homeAddress.zip;
        }
        return resource;
    }
}

export default new UserMapper();
