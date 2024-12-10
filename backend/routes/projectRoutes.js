const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Create a new project
router.post('/projects', projectController.createProject);

// Get all projects
router.get('/projects', projectController.getAllProjects);

// Update a project by ID
router.put('/projects/:id', projectController.updateProject);

// Delete a project by ID
router.delete('/projects/:id', projectController.deleteProject);

module.exports = router;
