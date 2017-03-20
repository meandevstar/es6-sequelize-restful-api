import './bootstrap';

import should from 'should';
import Chance from 'chance';
import jwt from 'jsonwebtoken';
import {issueToken} from '../lib';
import {user} from '../../module-schemas';

const random = new Chance();
const {types} = user;

describe('issueToken(payload, cb)', function() {
    let payload = null;

    beforeEach(() => {
        payload = {
            id: random.hash({length: 24}),
            name: random.name(),
            type: random.pickone(types)
        };
    });

    it('Should issue access token', (done) => {
        issueToken(payload, (err, token) => {
            should.not.exist(err);
            should.exist(token);

            const tokenPayload = jwt.decode(token);
            const {iat, exp} = tokenPayload;
            payload = Object.assign(payload, {iat, exp});

            should.deepEqual(tokenPayload, payload);
            done();
        });
    });
});
