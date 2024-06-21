const pool = require('../models/database');

// Obtener todas las tareas
const getTasks = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Crear una nueva tarea
const createTask = async (req, res) => {
    const { name, projectId, description, status } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO tasks (name, project_id, description, status) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, projectId, description, status]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una tarea existente
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { name, projectId, description, status } = req.body;
    try {
        const result = await pool.query(
            'UPDATE tasks SET name = $1, project_id = $2, description = $3, status = $4 WHERE id = $5 RETURNING *',
            [name, projectId, description, status, id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar una tarea
const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'DELETE FROM tasks WHERE id = $1 RETURNING *',
            [id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
