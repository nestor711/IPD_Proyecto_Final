const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Project extends Model {}

Project.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Project',
  timestamps: false
});

module.exports = Project;
