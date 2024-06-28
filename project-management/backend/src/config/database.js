const { Sequelize } = require('sequelize');
require('dotenv').config();
const logger = require('../logger');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: (msg) => logger.info(msg),
});

module.exports = sequelize;
