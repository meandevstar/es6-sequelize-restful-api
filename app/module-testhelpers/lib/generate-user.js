import Chance from 'chance';
import {user} from '../../module-schemas';

const random = new Chance();
const {statuses, types} = user;

export default function () {
    return {
        firstName: random.first(),
        lastName: random.last(),
        type: random.pickone(types),
        email: random.email(),
        password: random.string({length: 8}),
        status: random.pickone(statuses),
        createdAt: random.date(),
        updatedAt: random.date()
    };
}