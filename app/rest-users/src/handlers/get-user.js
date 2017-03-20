import Joi          from 'joi';
import { omit }     from 'lodash';
import { Router }   from 'express';

import { user, utils }      from '../../../module-schemas';
import { validateRequest }  from '../../../module-middlewares';
import { verifyToken }      from '../../../module-jwt';





const router        = new Router();
const {User}        = user;
const fieldsToOmit  = [
	'password',
	'facebook',
	'google'
];





const schema = {
	userId: Joi.string().required()
};





const getUser = (req, res, next) => {
	const {userId} = req.params;

	User.findById(userId).then(function (result) {

		result = omit(result.dataValues, fieldsToOmit);
		result = utils.plainTransform(result);
		res.status(200).send(result);
	});
};





router.get('/v1/user/:userId', verifyToken, validateRequest(schema), getUser);





export default router;