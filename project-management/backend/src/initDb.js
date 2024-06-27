const sequelize = require('./config/database');
const Project = require('./models/project');
const Task = require('./models/task');
const User = require('./models/user');
const logger = require('./logger');

async function initDB() {
  try {
    await sequelize.sync({ force: true });

    // Crear datos de ejemplo
    for (let i = 1; i <= 5; i++) {
      const project = await Project.create({
        name: `Project ${i}`,
        description: `Description for project ${i}`,
      });

      for (let j = 1; j <= 5; j++) {
        await Task.create({
          name: `Task ${j} for project ${i}`,
          description: `Description for task ${j}`,
          projectId: project.id,
        });
      }
    }

    logger.info('Database initialized with sample data');
    process.exit();
  } catch (error) {
    logger.error('Error initializing database', error);
    process.exit(1);
  }
}

initDB();
