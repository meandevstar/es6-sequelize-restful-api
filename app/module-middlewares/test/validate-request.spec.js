import should from 'should';
import Chance from 'chance';
import Joi from 'joi';
import {validateRequest} from '../lib';

const random = new Chance();

describe('validateRequest', function() {
    let req = null;
    let res = null;
    let schema = null;
    let payload = null;

    beforeEach(() => {
        res = {};
        payload = { name: random.string({length: 8}) };
        req = { body: payload };
        schema = { name: Joi.string().min(8).required() };
    });

    it('Should validate request payload', (done) => {
        const validate = validateRequest(schema);
        validate(req, res, (err) => {
            should.not.exist(err);
            done();
        });
    });

    it('Should complain if required attribute is not provided in request payload', (done) => {
        const validate = validateRequest(schema);
        delete req.body.name;
        validate(req, res, (err) => {
            const message = '"name" is required';
            should.exist(err);
            err.details[0].message.should.equal(message);
            done();
        });
    });

    it('Should complain if invalid attribute is provided in request payload', (done) => {
        const validate = validateRequest(schema);
        req.body.name = random.string({length:2});
        validate(req, res, (err) => {
            const message = '"name" length must be at least 8 characters long';
            should.exist(err);
            err.details[0].message.should.equal(message);
            done();
        });
    });
});
