import UserModel from './models/userModel';

export default function() {
    return UserModel.count()
        .then(function(countUser) {
            if (countUser > 1) {
                console.log('User available, skip seed')
                return;
            }

            var promises = [];

            // create test users
            var user1 = new UserModel({
                firstName: 'John',
                lastName: 'Doo'
            });
            promises.push(user1.save())

            var user2 = new UserModel({
                firstName: 'Jane',
                lastName: 'Dee'
            });
            promises.push(user2.save())

            // wait for all promised have finised
            return Promise.all(promises);
        })
        .then(function(result) {
            if (result) {
                console.log('Successfull seeded database')
            }
        })
        .catch(function(err) {
            console.log('Failed to seed data', err)
        })
}
