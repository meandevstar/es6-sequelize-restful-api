'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    var User = queryInterface.createTable('User', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

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

        facebook: {
            type: Sequelize.JSONB,
            field: 'facebook'
        },

        google: {
            type: Sequelize.JSONB,
            field: 'google'
        },

        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },

        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('User');
  }
};
