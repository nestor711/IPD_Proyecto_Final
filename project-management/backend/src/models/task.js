const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = require('./project');

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

Task.belongsTo(Project, { onDelete: 'CASCADE' });
Project.hasMany(Task);

module.exports = Task;
