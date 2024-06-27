const logger = require('../logger');

// Dentro de tus controladores, por ejemplo, en el método para crear un proyecto:
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    logger.info(`Project created: ${project.id}`);
    res.status(201).json(project);
  } catch (error) {
    logger.error('Error creating project', error);
    res.status(500).json({ message: 'Error creating project' });
  }
};

// Similarmente para update, delete y otros métodos CRUD.
