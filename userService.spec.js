/**
 * Created by tommarien on 18/02/16.
 */
import userService from './userService';
import db from './db';

describe.only('userService', ()=> {
    let stubFactory;

    beforeEach(()=> {
        stubFactory = sinon.sandbox.create();
    });

    afterEach(()=> {
        stubFactory.restore();
    });

    it('it adds the key and saves the user', ()=> {
        // arrange
        const user = {apiKeys: []};

        const dbStub = stubFactory.stub(db, db.save.name);

        // act
        const result = userService.addKey(user, 'mykey');

        // assert
        expect(user.apiKeys).to.contain('mykey');
        expect(dbStub).to.have.been.calledWith(user);
        expect(result).to.equal(true);
    });

    it('it return false when something goes wrong', ()=> {
        // arrange
        const user = {apiKeys: []};

        const dbStub = stubFactory.stub(db, db.save.name).throws(new Error());

        // act
        const result = userService.addKey(user, 'mykey');

        // assert
        expect(result).to.equal(false);
    });

});