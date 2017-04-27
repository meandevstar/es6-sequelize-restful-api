import Joi                  from 'joi';
import { pick, omit, each } from 'lodash';
import { Router }           from 'express';

import { user }             from '../../../module-schemas';
import { validateRequest, RequireRole }  from '../../../module-middlewares';
import { verifyToken }      from '../../../module-jwt';
import {UnprocessableEntityError} from '../../../module-errors';





const router        = new Router();
const {User}        = user;
const allowedFields = [
	'firstName',
	'lastName'
];
const fieldsToOmit  = [
	'password',
	'facebook',
	'google'
];





const schema = {
	userId      : Joi.string().required(),
	firstName   : Joi.string().required(),
	lastName    : Joi.string().required()
};





const updateUser = (req, res, next) => {
	const {userId}  = req.params;
	const payload   = pick(req.body, allowedFields);
	const query = {where: {id: userId}};
	

	User.findById(userId).then((findResult) => {
		if (findResult) {
			findResult.updateAttributes(payload).then(function(updateResult) {
				var result = omit(updateResult.toJSON(), fieldsToOmit);
				res.status(200).json(result);
			});
		} else {
			return next(new UnprocessableEntityError('user not exist'));
		}	
	});
};





router.put('/v1/user/:userId', verifyToken, validateRequest(schema), updateUser);





export default router;
