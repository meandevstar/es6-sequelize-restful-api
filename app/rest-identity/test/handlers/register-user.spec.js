import '../../../test/bootstrap';

import should from 'should';
import Chance from 'chance';
import {without} from 'lodash';
import request from 'supertest';
import {user} from '../../../module-schemas';
import {generateUser} from '../../../module-testhelpers';
import app from '../../../app';





const {User, types} = user;
const random = new Chance();





describe("[POST] /v1/users", function() {
    this.timeout(20000);

    let payload = null;
    let userId = null;





    beforeEach(() => {
        payload = generateUser();
        payload.type = random.pick(without(types, 'ADMIN'));
        delete payload.status;
        delete payload.createdAt;
        delete payload.updatedAt;
    });





    afterEach((done) => {
        if(!userId) return done();
        
        const query = {where: {id: userId}};
        User.find(query).then(function(result){
            if (result)
                result.destroy();
            done();
        });
    });





    function shouldReturnValidationError(payload, key, done){
        request(app)
            .post('/v1/users')
            .send(payload)
            .expect(422)
            .expect(({body}) => {
                body.name.should.equal('ValidationError');
                body.details[0].path.should.equal(key);
            })
            .end(done);
    }





    it('Should successfully register new user', (done) => {
        request(app)
            .post('/v1/users')
            .send(payload)
            .expect(201)
            .expect(({body}) => {
                should.exist(body);
                delete payload.password;

                const {id, createdAt, status} = body;
                userId = id;
                payload = Object.assign(payload, body);
                should.deepEqual(body, payload);
            })
            .end(done);
    });





    it('Should return validation error if firstName is not provided', (done) => {
        delete payload.firstName;
        shouldReturnValidationError(payload, 'firstName', done);
    });





    it('Should return validation error if lastName is not provided', (done) => {
        delete payload.lastName;
        shouldReturnValidationError(payload, 'lastName', done);
    });





    it('Should return validation error if email is not provided', (done) => {
        delete payload.email;
        shouldReturnValidationError(payload, 'email', done);
    });





    it('Should return validation error if email is invalid', (done) => {
        payload.email = random.word();
        shouldReturnValidationError(payload, 'email', done);
    });





    it('Should return validation error if password is not provided', (done) => {
        delete payload.password;
        shouldReturnValidationError(payload, 'password', done);
    });





    it('Should return validation error if password length is less than 8 characters', (done) => {
        payload.password = random.string({length: 7});
        shouldReturnValidationError(payload, 'password', done);
    });





    it('Should return validation error if password length more than 30 characters', (done) => {
        payload.password = random.string({length: 31});
        shouldReturnValidationError(payload, 'password', done);
    });
});