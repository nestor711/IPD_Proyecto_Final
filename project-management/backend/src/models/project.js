const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Project.associate = (models) => {
  Project.hasMany(models.Task, {
    foreignKey: 'projectId',
    as: 'tasks',
    onDelete: 'CASCADE', // Esto asegura el borrado en cascada
  });
};

module.exports = Project;
