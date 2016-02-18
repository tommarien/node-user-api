'use strict';

import request from 'supertest-as-promised';
import mongoose from 'mongoose';
import './cleanDbSpecification';
import app from '../boot/expressConfig';

import UserModel from '../models/userModel';

describe('/api/users', ()=> {

    describe('HTTP GET /:id', ()=> {
        let user;

        beforeEach(()=> {
            user = new UserModel({
                firstName: 'John',
                lastName: 'Doo',
                age: 37,
                email: 'john.doo@gmail.com',
                homeAddress: {
                    addressLine: "Street 34",
                    city: 'City',
                    zip: '12345'
                }
            });

            return user.save();
        });

        it('it returns http status 200', ()=> {
            const p = act(user._id)
                .expect(200);

            return expect(p).to.be.eventually.fulfilled;
        });

        it('it sets content-type to application/json', ()=> {
            const p = act(user._id)
                .expect('Content-Type', /application\/json/);

            return expect(p).to.be.eventually.fulfilled;
        });

        it('it returns the resource', ()=> {
            const p = act(user._id)
                .expect({
                    id: user._id,
                    name: 'John Doo',
                    age: 37,
                    email: 'john.doo@gmail.com',
                    address: 'Street 34',
                    city: 'City',
                    zip: '12345'
                });

            return expect(p).to.be.eventually.fulfilled;
        });

        function act(id) {
            return request(app)
                .get(`/api/users/${id}`);
        }

        describe('when user does not exist', ()=> {

            it('it returns http status 404', ()=> {
                const p = act('ABD1111')
                    .expect(404);

                return expect(p).to.be.eventually.fulfilled;
            });

            it('it sets content-type to application/json', ()=> {
                const p = act('ABD1112')
                    .expect('Content-Type', /application\/json/);

                return expect(p).to.be.eventually.fulfilled;
            });

            it('returns the error as json', ()=> {
                const p = act('ABD1111')
                    .expect({
                        code: 'Not Found',
                        message: 'The resource was not found'
                    });

                return expect(p).to.be.eventually.fulfilled;

            })
        });
    });
});
