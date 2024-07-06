const Task = require('../models/task');
const Project = require('../models/project');
const logger = require('../logger');

// Crear una nueva tarea
async function createTask(req, res) {
  try {
    const { name, description, projectId } = req.body;
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    const task = await Task.create({ name, description, projectId });
    logger.info(`Task created: ${task.id}`);
    res.status(201).json(task);
  } catch (error) {
    logger.error('Error creating task', error);
    res.status(500).json({ message: 'Error creating task' });
  }
}

// Obtener todas las tareas
async function getAllTasks(req, res) {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    logger.error('Error getting tasks', error);
    res.status(500).json({ message: 'Error getting tasks' });
  }
}

// Obtener una tarea por ID
async function getTaskById(req, res) {
  try {
    const { id } = req.params;
    const { projectId } = req.query;
    
    let task;
    if (projectId) {
      task = await Task.findAll({
        where: { projectId: parseInt(projectId) }
      });
    } else {
      task = await Task.findByPk(id);
    }
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    logger.error('Error getting task', error);
    res.status(500).json({ message: 'Error getting task' });
  }
}

// Actualizar una tarea
async function updateTask(req, res) {
  try {
    const { id } = req.params;
    const { name, description, completed } = req.body;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.name = name;
    task.description = description;
    task.completed = completed;
    await task.save();
    logger.info(`Task updated: ${task.id}`);
    res.status(200).json(task);
  } catch (error) {
    logger.error('Error updating task', error);
    res.status(500).json({ message: 'Error updating task' });
  }
}

// Borrar una tarea
async function deleteTask(req, res) {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.destroy();
    logger.info(`Task deleted: ${task.id}`);
    res.status(204).send();
  } catch (error) {
    logger.error('Error deleting task', error);
    res.status(500).json({ message: 'Error deleting task' });
  }
}

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask };
