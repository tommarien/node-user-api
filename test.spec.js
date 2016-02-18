import myService from './myService';

describe('test', () => {
    it('it works', ()=> {
        expect(true).to.equal(true);
    });

    it('finds something', (done)=> {
        myService.find('query', function (err, data) {
            expect(data).to.equal('query');
            done();
        });
    });

    it('finds something promised', (done)=> {
        myService.findP('query')
            .then((result)=> {
                expect(result).to.equal('query');
                done();
            })
            .catch((err)=> done(err))
    });

    it('finds something promised enhanced', ()=> {
        return myService.findP('query')
            .then((result)=> {
                expect(result).to.equal('query');

            })
    });

    it('finds something promised enhanced chai as promised', ()=> {
        const promise = myService.findP('query');

        return expect(promise).to.eventually.equal('query');
    });

    it('returns an error if no query', (done)=> {
        myService.find(null, function (err, data) {
            expect(err).to.equal('Query is required');
            done();
        });
    });

    it('returns an error if no query promised', (done)=> {
        myService.findP(null)
            .then((result)=> {
                done('fails');
            })
            .catch((err)=> {
                expect(err).to.equal('Query is required');
                done();
            })
    });

    it('returns an error if no query promised enhanced', ()=> {
        return myService.findP(null)
            .then((result)=> {
                throw new Error('Shizzle')
            })
            .catch((err)=> {
                expect(err).to.equal('Query is required');
            })
    });

    it('returns an error if no query promised enhanced chai as promised', ()=> {
        const promise = myService.findP(null);

        return expect(promise).to.be.rejectedWith('Query is required');
    });

});