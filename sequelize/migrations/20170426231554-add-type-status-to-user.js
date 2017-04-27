'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      "CREATE TYPE \"enum_user_statuses\" AS ENUM(\'ACTIVE\', \'INACTIVE\'); ALTER TABLE \"User\" ADD COLUMN \"status\" \"enum_user_statuses\" NOT NULL DEFAULT 'ACTIVE';" +
      "CREATE TYPE \"enum_user_types\" AS ENUM(\'ADMIN\', \'USER\'); ALTER TABLE \"User\" ADD COLUMN \"type\" \"enum_user_types\" NOT NULL DEFAULT 'USER';"
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      "DROP TYPE \"enum_user_statuses\"; ALTER TABLE \"User\" DROP COLUMN \"status\";" +
      "DROP TYPE \"enum_user_statuses\"; ALTER TABLE \"User\" DROP COLUMN \"type\";"
    );
  }
};
