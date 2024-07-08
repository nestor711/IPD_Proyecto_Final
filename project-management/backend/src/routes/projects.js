const express = require('express');
const { createProject, getAllProjects, getProjectById, updateProject, deleteProject, getAllProjectIds } = require('../controllers/projectController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, createProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.put('/:id', auth, updateProject);
router.delete('/:id', auth, deleteProject);
router.get('/all-ids', getAllProjectIds); 

module.exports = router;
