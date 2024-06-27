const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_name', 'db_user', 'db_password', {
  host: 'postgres-service',
  dialect: 'postgres',
});

module.exports = sequelize;
