const express = require('express');
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask, getTasksByProjectId } = require('../controllers/taskController');

const router = express.Router();

router.post('/', createTask);
router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/project/:projectId', getTasksByProjectId);

module.exports = router;
