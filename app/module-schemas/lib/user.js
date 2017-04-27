import {Schema} from 'mongoose';
import sequelize from './db';
import {Sequelize} from 'sequelize';
import * as revalidator from 'revalidator';

const userStatuses = ['ACTIVE', 'INACTIVE'];
const userTypes = ['ADMIN', 'USER'];

var schemaValidator = function (schema) {
    return function (value) {
        var results = revalidator.validate(value, schema);
        if (!results.valid) throw new Error(JSON.stringify(results.errors));
    };
};

const userAttributes = {
    firstName: {
        type: Sequelize.STRING,
        field: 'first_name'
    },

    lastName: {
        type: Sequelize.STRING,
        field: 'last_name'
    },

    email: {
        type: Sequelize.STRING,
        field: 'email',
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'password'
    },

    status: {
        type: Sequelize.ENUM,
        values: userStatuses,
        allowNull: false,
        field: 'status',
        defaultValue: 'ACTIVE'
    },

    type: {
        type: Sequelize.ENUM,
        values: userTypes,
        allowNull: false,
        field: 'type',
        defaultValue: 'USER'
    },

    facebook: {
        type: Sequelize.JSONB,
        field: 'facebook',
        validate: {
            schema: schemaValidator({
                type: "object",
                properties: {
                    userId: {type: 'string'},
                    accessToken: {type: 'string'}
                }
            })
        }
    },

    google: {
        type: Sequelize.JSONB,
        field: 'google',
        validate: {
            schema: schemaValidator({
                type: "object",
                properties: {
                    userId: {type: 'string'},
                    accessToken: {type: 'string'}
                }
            })
        }
    }
};

var User = sequelize.define('User', userAttributes, {
  freezeTableName: true // Model tableName will be the same as the model name
});


export {User, userStatuses, userTypes};