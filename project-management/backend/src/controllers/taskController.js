const Task = require('../models/task');
const logger = require('../logger');

// Crear una nueva tarea
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      projectId: req.params.projectId
    });
    logger.info(`Task created: ${task.id}`);
    res.status(201).json(task);
  } catch (error) {
    logger.error('Error creating task', error);
    res.status(500).json({ message: 'Error creating task' });
  }
};

// Obtener todas las tareas de un proyecto
exports.getTasksByProjectId = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { projectId: req.params.projectId } });
    res.status(200).json(tasks);
  } catch (error) {
    logger.error('Error fetching tasks', error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

// Obtener una tarea por ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    logger.error('Error fetching task', error);
    res.status(500).json({ message: 'Error fetching task' });
  }
};

// Actualizar una tarea
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.update(req.body);
    logger.info(`Task updated: ${task.id}`);
    res.status(200).json(task);
  } catch (error) {
    logger.error('Error updating task', error);
    res.status(500).json({ message: 'Error updating task' });
  }
};

// Eliminar una tarea
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
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
};
