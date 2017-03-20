import Joi from 'joi';
import {Router} from 'express';
import {omit, without, pick} from 'lodash';
import {user} from '../../../module-schemas';
import {hash} from '../../../module-crypto';
import {validateRequest, RequireRole} from '../../../module-middlewares';
import {UnprocessableEntityError} from '../../../module-errors';





const router = new Router();
const {User, types} = user;
const allowedTypes = without(types, 'admin');
const fieldsToOmit = ['password'];
const allowedFields = [
    'firstName',
    'lastName',
    'password',
    'email',
    'type'
];





const schema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().min(8).max(30).required(),
    email: Joi.string().email().required(),
    type: Joi.string().valid(allowedTypes).required()
};





const registerUser = (req, res, next) => {
    let payload = pick(req.body, allowedFields);
    payload.google = {};
    payload.facebook = {};
    payload.google.userId = 'null';
    payload.google.accessToken = 'null';
    payload.facebook.userId = 'null';
    payload.facebook.accessToken = 'null';

    const query = {where: {email: payload.email}};

    User.findOne(query).then((result) => {
        if(result)
            return next(new UnprocessableEntityError('User with this email already exists.'));

        payload.password = hash(payload.password);

        User.create(payload).then((result) => {
            result = omit(result.dataValues, fieldsToOmit);
            res.status(201).send(result);
        });
    });
};





router.post('/v1/users', validateRequest(schema), registerUser);





export default router;
