const Project = require('../models/project');
const Task = require('../models/task');
const logger = require('../logger');

// Crear un nuevo proyecto
async function createProject(req, res) {
  try {
    const { name, description } = req.body;
    const project = await Project.create({ name, description });
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
    const { name, description } = req.body;
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    project.name = name;
    project.description = description;
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

module.exports = { createProject, getAllProjects, getProjectById, updateProject, deleteProject };
