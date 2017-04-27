import Joi      from 'joi';
import {Router} from 'express';
import {omit}   from 'lodash';

import {user}               from '../../../module-schemas';
import {compare}            from '../../../module-crypto';
import {issueToken}         from '../../../module-jwt';
import {validateRequest}    from '../../../module-middlewares';
import {UnauthorizedError}  from '../../../module-errors';





const router            = new Router();
const {User}            = user;
const fieldsToOmit      = [
    'password',
    'facebook',
    'google'
];





const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required()
};





const authenticate = (req, res, next) => {
    const {email, password} = req.body;

    const query = {where:{email: email}};

    User.findOne(query).then((result) => {
        if(!result) return next(new UnauthorizedError('User does not exist'));

        const valid = compare(password, result.password);

        if(!valid) return next(new UnauthorizedError('Invalid password'));

        const {_id, type}   = result;
        const payload       = {_id, type};

        issueToken(payload, (err, token) => {
            if(err) return next(err);

            const userDetails   = omit(result.dataValues, fieldsToOmit);
            const responseBody  = {user: userDetails, token};

            res.set('x-user-type', type);
            res.status(200).json(responseBody);
        });
    });
};





router.post('/v1/user/authenticate', validateRequest(schema), authenticate);





export default router;