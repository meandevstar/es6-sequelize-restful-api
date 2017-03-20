import './bootstrap';

import should from 'should';
import Chance from 'chance';
import {hash} from '../lib';

const random = new Chance();

describe('hash(text)', () => {
    it('Should hash plain text', function() {
        const text = random.word();
        const hashed = hash(text);

        should.exist(hashed);
    });

    it('Should complain if text is not provided', () => {
        const err = hash();
        should.exist(err);
        err.message.should.equal('Please provide text.');
    });
});