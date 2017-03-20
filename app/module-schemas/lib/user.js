import {Schema} from 'mongoose';
import sequelize from './db';
import {Sequelize} from 'sequelize';
import * as revalidator from 'revalidator';

const userStatuses = ['active', 'inactive'];
const userTypes = ['resident', 'service_provider', 'service_runner', 'qa' , 'admin'];

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
        defaultValue: 'active'
    },

    type: {
        type: Sequelize.ENUM,
        values: userTypes,
        allowNull: false,
        field: 'type',
        defaultValue: 'resident'
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

    metadata: {
        type:Sequelize.JSONB,
        field: 'metadata',
        defaultValue: {}
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

var User = sequelize.define('user', userAttributes, {
  freezeTableName: true // Model tableName will be the same as the model name
});


export {User, userStatuses, userTypes};