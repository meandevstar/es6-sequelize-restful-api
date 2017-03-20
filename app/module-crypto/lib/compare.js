import crypto from 'crypto';
import {get} from '../../module-config';

export default function (text, hash) {
    if(!text) return new Error('Please provide text to compare.');
    if(!hash) return new Error('Please provide hash to compare with.');

    const algorithm = get('enc_algorithm'),
        salt = get('enc_salt'),
        hmac = crypto.createHmac(algorithm, salt);

    hmac.update(text);

    const newHash = hmac.digest('hex');

    return newHash === hash;
}