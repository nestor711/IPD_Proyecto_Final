const { sequelize, User, Project, Task } = require('../src/models');
const bcrypt = require('bcryptjs');

async function initDB() {
  try {
    await sequelize.sync({ force: true });

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({ 
      username: 'admin', 
      password: hashedPassword,
      name: 'Admin User'
    });

    const project1 = await Project.create({ 
      title: 'Project 1', 
      description: 'First test project',
      priority: 'high',
      culmination_date: new Date(2024, 6, 15) // Ejemplo: 15 de junio de 2024
    });
    const project2 = await Project.create({ 
      title: 'Project 2', 
      description: 'Second test project',
      priority: 'medium'
    });

    await Task.create({ 
      title: 'Task 1', 
      description: 'First task', 
      projectId: project1.id,
      status: 'in_progress'
    });
    await Task.create({ 
      title: 'Task 2', 
      description: 'Second task', 
      projectId: project1.id,
      status: 'pending'
    });
    await Task.create({ 
      title: 'Task 3', 
      description: 'Third task', 
      projectId: project2.id,
      status: 'completed',
      completion_date: new Date()
    });

    console.log('Database initialized with sample data');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initDB();