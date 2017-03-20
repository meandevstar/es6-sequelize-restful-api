import './bootstrap';

import should from 'should';
import Chance from 'chance';
import {hash, compare} from '../lib';

const random = new Chance();

describe('compare(text, hash)', function() {
    let text = null;
    let hashed = null;

    beforeEach(() => {
        text = random.word();
        hashed = hash(text);
    });

    it('Should return true if text is successfully compared with hashed text', () => {
        should.equal(compare(text, hashed), true);
    });

    it('Should return false if text is not compared with hashed text', () => {
        should.equal(compare('wrong-text', hashed), false);
    });

    it('Should complain if text is not provided', () => {
        const err = compare(null, hashed);
        should.exist(err);
        err.message.should.equal('Please provide text to compare.');
    });

    it('Should complain if hashed text is not provided', () => {
        const err = compare(text, null);
        should.exist(err);
        err.message.should.equal('Please provide hash to compare with.');
    });
});