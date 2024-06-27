const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = require('./project'); // Importar el modelo Project

const Task = sequelize.define('Task', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  dueDate: {
    type: DataTypes.DATE
  }
});

// Establecer relación con Project
Task.belongsTo(Project, {
  onDelete: 'CASCADE' // Configurar borrado en cascada
});

module.exports = Task;
