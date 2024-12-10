const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');

// Create a new achievement
router.post('/achievements', achievementController.createAchievement);

// Get all achievements
router.get('/achievements', achievementController.getAllAchievements);

// Update an achievement by ID
router.put('/achievements/:id', achievementController.updateAchievement);

// Delete an achievement by ID
router.delete('/achievements/:id', achievementController.deleteAchievement);

module.exports = router;
