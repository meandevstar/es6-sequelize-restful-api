import jwt from 'jsonwebtoken';
import * as config from '../../module-config';

export default function (payload, cb) {
    const secret = config.get('jwt_secret'),
        expiresIn = config.get('jwt_expires_in'),
        algorithm = config.get('jwt_algorithm');

    jwt.sign(payload, secret, {expiresIn, algorithm}, (err, token) => {
        if(err) return cb(err);
        cb(null, token);
    });
}
