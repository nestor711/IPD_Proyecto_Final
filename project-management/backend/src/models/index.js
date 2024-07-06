const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = require('./project')(sequelize, DataTypes);
const Task = require('./task')(sequelize, DataTypes);
const User = require('./user');

// Aquí deberías también inicializar tus modelos con sequelize, por ejemplo:
// Project.init(sequelize);
// Task.init(sequelize);
// User.init(sequelize);

// Y definir las asociaciones si las hay, por ejemplo:
// Project.associate({ Task, User });
// Task.associate({ Project, User });
// User.associate({ Project, Task });
Project.hasMany(Task, { foreignKey: 'projectId', onDelete: 'CASCADE' });
Task.belongsTo(Project, { foreignKey: 'projectId' });

const db = {
  sequelize,
  Sequelize,
  Project,
  Task,
  User
};
module.exports = db;