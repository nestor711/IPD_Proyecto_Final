const Project = require('../models/project');
const Task = require('../models/task');
const logger = require('../logger');

// Crear un nuevo proyecto
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

// Obtener todos los proyectos
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    logger.error('Error fetching projects', error);
    res.status(500).json({ message: 'Error fetching projects' });
  }
};

// Obtener un proyecto por ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [Task]
    });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    logger.error('Error fetching project', error);
    res.status(500).json({ message: 'Error fetching project' });
  }
};

// Actualizar un proyecto
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    await project.update(req.body);
    logger.info(`Project updated: ${project.id}`);
    res.status(200).json(project);
  } catch (error) {
    logger.error('Error updating project', error);
    res.status(500).json({ message: 'Error updating project' });
  }
};

// Eliminar un proyecto (y sus tareas)
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    await project.destroy();
    logger.info(`Project deleted: ${project.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error('Error deleting project', error);
    res.status(500).json({ message: 'Error deleting project' });
  }
};
