import {UnprocessableEntityError} from '../lib';

describe('UnprocessableEntityError', function() {
    it('Should return UnprocessableEntityError', () => {
        const err = new UnprocessableEntityError();
        err.should.be.an.instanceOf(Error);
        err.message.should.equal('Unprocessable Entity');
        err.name.should.equal('UnprocessableEntityError');
    })
});
