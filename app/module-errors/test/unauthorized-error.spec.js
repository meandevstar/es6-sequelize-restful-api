import {UnauthorizedError} from '../lib';

describe('UnauthorizedError', () => {
    it('Should return UnauthorizedError', function() {
        const err = new UnauthorizedError();
        err.should.be.an.instanceOf(Error);
        err.message.should.equal('Unauthorized Error');
        err.name.should.equal('UnauthorizedError');
    })
});
