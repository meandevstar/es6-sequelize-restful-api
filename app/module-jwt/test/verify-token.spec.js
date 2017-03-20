import './bootstrap';

import should from 'should';
import sinon from 'sinon';
import Chance from 'chance';
import ms from 'ms';
import { issueToken, verifyToken } from '../lib';
import {user} from '../../module-schemas';


const random = new Chance();
const {types} = user;

describe('verifyToken(req, res, next)', function() {
    let token = null;
    let payload = null;
    let req = null;
    let res = null;
    let clock = null;

    beforeEach((done) => {
        clock = sinon.useFakeTimers(Date.now());
        payload = {
            id: random.hash({length: 24}),
            name: random.name(),
            type: random.pickone(types)
        };

        issueToken(payload, (err, result) => {
            if(err) return done(err);

            token = result;
            req = {
                get: sinon.stub()
            };
            res = {};
            req.get.returns(token);
            done();
        });
    });

    afterEach(() => {
        clock.restore();
    });

    it('Should successfully verify access token', (done) => {
        verifyToken(req, res, (err) => {
            should.not.exist(err);

            const actual = req.token;
            const {iat, exp} = actual.payload;
            const expected = {
                raw: token,
                payload: Object.assign(payload, {iat, exp})
            };

            should.deepEqual(actual, expected);
            done();
        });
    });

    it('Should return MissingTokenError if access token is not provided', (done) => {
        req.get.returns(undefined);

        verifyToken(req, res, (err) => {
            should.exist(err);
            err.should.be.an.instanceOf(Error);
            err.name.should.equal('MissingTokenError');
            err.message.should.equal('Missing Token');
            done();
        });
    });

    it('Should return TokenExpiredError if access token is expired', (done) => {
        clock.tick(ms("8d"));

        verifyToken(req, res, (err) => {
            should.exist(err);
            err.should.be.an.instanceOf(Error);
            err.name.should.equal('TokenExpiredError');
            err.message.should.equal('jwt expired');
            done();
        });
    });
});
