const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'postgres', // Nombre del servicio PostgreSQL en Kubernetes
  dialect: 'postgres'
});

module.exports = sequelize;

