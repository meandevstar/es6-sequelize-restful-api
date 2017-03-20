import db from './db';
import {User, userStatuses, userTypes} from './user';
import {Location} from './location';
import {ServiceEntity} from './service-entity';
import {plainTransform} from './utils';

const user = {
    statuses: userStatuses,
    types: userTypes,
    User: User
};

const utils = {
    plainTransform: plainTransform
}

export {
    db,
    user,
    utils
};