const sequelize = require('../config/database');
const User = require('./user');
const Project = require('./project');
const Task = require('./task');

// Definir asociaciones
Project.hasMany(Task, { foreignKey: 'projectId', onDelete: 'CASCADE' });
Task.belongsTo(Project, { foreignKey: 'projectId' });

module.exports = {
  sequelize,
  User,
  Project,
  Task
};
