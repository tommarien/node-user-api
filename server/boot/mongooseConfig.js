import mongoose from 'mongoose';
import seedData from '../seedData';
import config from '../config';

export default {

    configure(){
        mongoose.connect(config.mongoUri);
        mongoose.Promise = global.Promise;

        seedData();
    }

};
