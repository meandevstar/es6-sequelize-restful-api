import '../../../test/bootstrap';

import should   from 'should';
import request  from 'supertest';
import {omit}   from 'lodash';
import app      from '../../../app';





describe("[GET] /v1/users/:userId", function() {
	this.timeout(20000);

	let user            = null;
	let userId          = null;
	let authToken       = null;
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
	});





	it('Should get user detail', function(done){
		request(app)
			.get(`/v1/user/${userId}`)
			.set('x-access-token', authToken)
			.expect(200)
			.expect(({body}) => {
				const expected = omit(user, fieldsToOmit);
				delete body.createdAt;
				delete body.updatedAt;
				should.deepEqual(body, expected);
			})
			.end(done);
	});
});