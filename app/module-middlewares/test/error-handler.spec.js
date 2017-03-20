import should from 'should';
import sinon from 'sinon';
import {errorHandler} from '../lib'
import {UnauthorizedError} from '../../module-errors';

describe("errorHandler(err, req, res, next)", function() {
	let err = null;
	let req = null;
	let res = null;
	let next = null;
	let body = null;

	beforeEach(() => {
		req = next = {};
		res = {
			status: sinon.spy(),
			send: sinon.spy()
		};

		err = new UnauthorizedError();

		body = {
			code: err.statusCode,
			name: err.name,
			message: err.message,
			details: []
		};
	});

	it('Should properly handle error', () => {
		errorHandler(err, req, res, next);
		res.status.calledOnce.should.equal(true);
		res.status.calledWith(401).should.equal(true);
		res.send.calledOnce.should.equal(true);
		res.send.calledWith(body).should.equal(true);
	});

	it('Should return internal server error belongs to Error class', () => {
		err = new Error();
		errorHandler(err, req, res, next);
		res.status.calledOnce.should.equal(true);
		res.status.calledWith(500).should.equal(true);
		body.code = 500;
		body.name = 'Error';
		body.message = 'Internal Server Error';
		res.send.calledOnce.should.equal(true);
		res.send.calledWith(body).should.equal(true);
	});
});