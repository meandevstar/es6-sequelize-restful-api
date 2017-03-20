import './bootstrap';

import should from 'should';
import {get} from '../lib';
import config from '../lib/config';

describe('get(key)', function (){
    it('Should get jwt_secret from test configurations', () => {
        const expected = config.jwt_secret;
        const actual = get('jwt_secret');
        should.equal(actual, expected);
    });

    it('Should return error if key is not provided', () => {
        const err = get();
        should.exist(err);
        err.message.should.equal('Please provide a valid key')
    });
});
