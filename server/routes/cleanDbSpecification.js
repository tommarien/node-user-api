import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

before(() => {

    //fix cannot overwrite compiled
    mongoose.models = {};
    mongoose.modelSchemas = {};

    return mongoose.connect('mongodb://localhost/users-test');

});

beforeEach(()=> {
    return mongoose.connection.db.dropDatabase();
});

after(()=> {
    return mongoose.disconnect();
});
