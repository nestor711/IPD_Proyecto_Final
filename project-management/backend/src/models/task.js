const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Task extends Model {}

Task.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending'
  },
  projectId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Projects',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  sequelize,
  modelName: 'Task',
  timestamps: false
});

module.exports = Task;
