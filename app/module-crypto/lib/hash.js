import crypto from 'crypto';
import {get} from '../../module-config';

export default function (text) {
    if(!text) return new Error('Please provide text.');

    const algorithm = get('enc_algorithm'),
        salt = get('enc_salt'),
        hmac = crypto.createHmac(algorithm, salt);

    hmac.update(text);

    return hmac.digest('hex');
}
