import Chance from 'chance';
import {location} from '../../module-schemas';

const random = new Chance();

export default function () {
    return {
        street: random.word(),
        city: random.word(),
        state: random.word(),
        zipcode: random.integer({min: 10000, max: 100000}).toString(),
        lat: random.floating({fixed: 2, min: 1, max: 150}),
        long: random.floating({fixed: 2, min: 1, max: 150})
    };
}