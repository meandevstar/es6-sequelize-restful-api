import db from './db';
import {User, userStatuses, userTypes} from './user';

const user = {
    statuses: userStatuses,
    types: userTypes,
    User: User
};

export {
    db,
    user
};