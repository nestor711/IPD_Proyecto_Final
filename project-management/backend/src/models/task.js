const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = require('./project');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  creation_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  completion_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('in_progress', 'completed', 'pending', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending' 
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Project,
      key: 'id'
    }
  }
}, {
  timestamps: true
});

module.exports = Task;
