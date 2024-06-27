const express = require('express');
const { getProjects, createProject } = require('../controllers/projectController');
const router = express.Router();

router.get('/', getProjects);
router.post('/', createProject);

// Define otras rutas como PUT y DELETE aquí

module.exports = router;