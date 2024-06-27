const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'database',
  process.env.DB_USER || 'username',
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || 'postgres-service', // Nombre del servicio PostgreSQL en Kubernetes
    port: process.env.DB_PORT || 5432, // Puerto del servicio PostgreSQL en Kubernetes
    dialect: 'postgres'
  }
);

module.exports = sequelize;
