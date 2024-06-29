const sequelize = require('../config/database');
const Project = require('./project');
const Task = require('./task');
const User = require('./user');

// Aquí deberías también inicializar tus modelos con sequelize, por ejemplo:
// Project.init(sequelize);
// Task.init(sequelize);
// User.init(sequelize);

// Y definir las asociaciones si las hay, por ejemplo:
// Project.associate({ Task, User });
// Task.associate({ Project, User });
// User.associate({ Project, Task });

module.exports = {
  sequelize,
  Project,
  Task,
  User
};