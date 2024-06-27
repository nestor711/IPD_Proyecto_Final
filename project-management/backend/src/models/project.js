const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Task = require('./task'); // Importar el modelo Task

const Project = sequelize.define('Project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  startDate: {
    type: DataTypes.DATE
  },
  endDate: {
    type: DataTypes.DATE
  }
});

// Establecer relación con Task
Project.hasMany(Task, {
  onDelete: 'CASCADE' // Configurar borrado en cascada
});

module.exports = Project;
