const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');

// Create a new experience
router.post('/experiences', experienceController.createExperience);

// Get all experiences
router.get('/experiences', experienceController.getAllExperiences);

// Update an experience by ID
router.put('/experiences/:id', experienceController.updateExperience);

// Delete an experience by ID
router.delete('/experiences/:id', experienceController.deleteExperience);

module.exports = router;
