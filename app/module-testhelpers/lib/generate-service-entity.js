import Chance from 'chance';
import {user} from '../../module-schemas';

const random = new Chance();
const {statuses, types} = user;

export default function () {
    return {
        managerId: random.integer({min: 1, max: 10000}).toString(),
        locationId: random.integer({min: 1, max: 10000}).toString(),
        createdAt: random.date(),
        updatedAt: random.date()
    };
}