const sequelize = require('../src/config/database');
const { User, Project, Task } = require('../src/models');
const bcrypt = require('bcryptjs');

async function initDB() {
  try {
    await sequelize.sync({ force: true });

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({ username: 'admin', password: hashedPassword });

    const project1 = await Project.create({ name: 'Project 1', description: 'First test project' });
    const project2 = await Project.create({ name: 'Project 2', description: 'Second test project' });

    await Task.create({ name: 'Task 1', description: 'First task', projectId: project1.id });
    await Task.create({ name: 'Task 2', description: 'Second task', projectId: project1.id });
    await Task.create({ name: 'Task 3', description: 'Third task', projectId: project2.id });

    console.log('Database initialized with sample data');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDB();