const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const router = express.Router();

// Rutas para tareas
router.get('/', getTasks);         // Obtener todas las tareas
router.post('/', createTask);      // Crear una nueva tarea
router.put('/:id', updateTask);    // Actualizar una tarea existente
router.delete('/:id', deleteTask); // Eliminar una tarea

module.exports = router;
