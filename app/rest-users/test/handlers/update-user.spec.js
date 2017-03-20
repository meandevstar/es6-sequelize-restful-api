import '../../../test/bootstrap';

import should   from 'should';
import Chance   from 'chance';
import request  from 'supertest';
import {omit}   from 'lodash';
import app      from '../../../app';





const random = new Chance();





describe("[PUT] /v1/users/:userId", function() {
	this.timeout(20000);

	let user            = null;
	let userId          = null;
	let authToken       = null;
	let payload         = null;
	const fieldsToOmit  = [
		'password',
		'facebook',
		'google',
		'createdAt',
		'updatedAt'
	];





	beforeEach(function(){
		user        = global.user;
		userId      = user.id;
		authToken   = global.authToken;
		payload     = {
			firstName   : random.first(),
			lastName    : random.last()
		}
	});





	it('Should update user detail', function(done){
		request(app)
			.put(`/v1/user/${userId}`)
			.set('x-access-token', authToken)
			.send(payload)
			.expect(200)
			.expect(({body}) => {
				const expected      = omit(user, fieldsToOmit);
				expected.firstName  = payload.firstName;
				expected.lastName   = payload.lastName;
				delete body.createdAt;
				delete body.updatedAt;

				should.deepEqual(body, expected);
			})
			.end(done);
	});
});