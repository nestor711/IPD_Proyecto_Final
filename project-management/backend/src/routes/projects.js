const express = require('express');
const Project = require('../models/project');
const router = express.Router();

// CRUD routes for projects
router.post('/', async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Additional CRUD routes (put, delete, get by id) here

module.exports = router;
