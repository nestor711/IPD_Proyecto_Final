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
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  projectId: {
    type: DataTypes.INTEGER,
    references: {
      model: Project,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

Project.hasMany(Task, { onDelete: 'CASCADE' });
Task.belongsTo(Project);

module.exports = Task;
