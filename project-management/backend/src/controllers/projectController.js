const Project = require('../models/project');
const Task = require('../models/task');
const logger = require('../logger');

// Crear un nuevo proyecto
async function createProject(req, res) {
  try {
    const { title, description, priority, culmination_date } = req.body;
    const project = await Project.create({ title, description, priority, culmination_date });
    logger.info(`Project created: ${project.id}`);
    res.status(201).json(project);
  } catch (error) {
    logger.error('Error creating project', error);
    res.status(500).json({ message: 'Error creating project' });
  }
}

// Obtener todos los proyectos
async function getAllProjects(req, res) {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    logger.error('Error getting projects', error);
    res.status(500).json({ message: 'Error getting projects' });
  }
}

// Obtener un proyecto por ID
async function getProjectById(req, res) {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id, { include: Task });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    logger.error('Error getting project', error);
    res.status(500).json({ message: 'Error getting project' });
  }
}

// Actualizar un proyecto
async function updateProject(req, res) {
  try {
    const { id } = req.params;
    const { title, description, priority, culmination_date } = req.body;
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    project.title = title;
    project.description = description;
    project.priority = priority;
    project.culmination_date = culmination_date;
    await project.save();
    logger.info(`Project updated: ${project.id}`);
    res.status(200).json(project);
  } catch (error) {
    logger.error('Error updating project', error);
    res.status(500).json({ message: 'Error updating project' });
  }
}

// Borrar un proyecto
async function deleteProject(req, res) {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);
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
}

// Obtener los IDs de todos los proyectos
async function getAllProjectIds(req, res) {
  try {
    const projects = await Project.findAll({
      attributes: ['id']
    });
    const projectIds = projects.map(project => project.id);
    res.status(200).json(projectIds);
  } catch (error) {
    logger.error('Error getting project IDs', error);
    res.status(500).json({ message: 'Error getting project IDs' });
  }
}
module.exports = { createProject, getAllProjects, getProjectById, updateProject, deleteProject, getAllProjectIds };
