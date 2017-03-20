import jwt from 'jsonwebtoken';
import * as config from '../../module-config';
import {MissingTokenError} from '../../module-errors';

export default (req, res, next) => {
    const accessToken = req.get('x-access-token');

    if(!accessToken)
        return next(new MissingTokenError());

    const secret = config.get('jwt_secret'),
        algorithm = config.get('jwt_algorithm');

    jwt.verify(accessToken, secret, {algorithm}, (err, token) => {
        if(err){
            err.statusCode = 401;
            return next(err);
        }
        req.token = {
            raw: accessToken,
            payload: token
        };
        next();
    })
}