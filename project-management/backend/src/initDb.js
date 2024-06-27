const sequelize = require('./config/database');
const Project = require('./models/project');
const Task = require('./models/task');
const User = require('./models/user'); // Asumiendo que tienes un modelo de usuario

async function initDb() {
  try {
    await sequelize.sync({ force: true });

    // Crear usuario inicial
    const user = await User.create({
      username: 'admin',
      password: 'admin' // Asegúrate de que el modelo de usuario maneje el hashing de la contraseña
    });

    // Crear proyectos y tareas
    for (let i = 1; i <= 5; i++) {
      const project = await Project.create({
        name: `Proyecto ${i}`,
        description: `Descripción del Proyecto ${i}`,
        startDate: new Date(),
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // Una semana después
      });

      for (let j = 1; j <= 5; j++) {
        await Task.create({
          name: `Tarea ${j} del Proyecto ${i}`,
          description: `Descripción de la Tarea ${j} del Proyecto ${i}`,
          dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * (7 + j)), // Un día más por cada tarea
          ProjectId: project.id
        });
      }
    }

    console.log('Database initialized with sample data');
  } catch (error) {
    console.error('Error initializing database', error);
  } finally {
    sequelize.close();
  }
}

initDb();
