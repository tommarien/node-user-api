import UserModel from './models/userModel';
import faker from 'faker';

export default function () {
    return UserModel.count()
        .then(function (countUser) {
            if (countUser > 1) {
                console.log('User available, skip seed')
                return;
            }

            var promises = [];

            for (let i = 0; i < 1000; i++) {
                const user = new UserModel({
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName(),
                    age: faker.random.number({min: 18, max: 100}),
                    email: faker.internet.email(),
                    homeAddress: {
                        addressLine: faker.address.streetAddress(),
                        city: faker.address.city(),
                        zip: faker.address.zipCode(),
                    }
                });

                promises.push(user.save())
            }

            // wait for all promised have finised
            return Promise.all(promises);
        })
        .then(function (result) {
            if (result) {
                console.log('Successfull seeded database')
            }
        })
        .catch(function (err) {
            console.log('Failed to seed data', err)
        })
}
