import { MissingTokenError } from '../lib';

describe('MissingTokenError', () => {
    it('Should return MissingTokenError', function() {
        const err = new MissingTokenError();
        err.should.be.an.instanceOf(Error);
    })
});
