import mongoose from 'mongoose';
import shortId from 'shortid';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: {
        type: String,
        default: function () {
            return shortId.generate();
        },
        required: true
    },
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    homeAddress: {
        addressLine: String,
        city: String,
        zip: String,
    },
});

export default mongoose.model('User', UserSchema);
