const Achievement = require('../models/achievements');
const mongoose = require("mongoose");

// Create a new achievement
exports.createAchievement = async (req, res) => {
  try {
    // Add input validation
    const { title, description, date, icon=" " } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const newAchievement = new Achievement({
      title,
      description,
      date: date || new Date(),
      icon
    });

    await newAchievement.save();
    res.status(201).json({ 
      message: "Achievement created successfully", 
      achievement: newAchievement 
    });
  } catch (error) {
    console.error('Create Achievement Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all achievements
exports.getAllAchievements = async (req, res) => {
  try {
    // Optional: Add pagination and sorting
    const { page = 1, limit = 10, sortBy = 'createdAt' } = req.query;
    
    const achievements = await Achievement.find()
      .sort({ [sortBy]: -1 }) // Sort in descending order
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Achievement.countDocuments();

    res.status(200).json({
      achievements,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('Get Achievements Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an achievement by ID
exports.updateAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, icon } = req.body;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid achievement ID" });
    }

    const updatedAchievement = await Achievement.findByIdAndUpdate(
      id, 
      { title, description, date, icon },
      { 
        new: true, 
        runValidators: true // Ensures model validations are run on update
      }
    );

    if (!updatedAchievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    res.status(200).json({ 
      message: "Achievement updated successfully", 
      achievement: updatedAchievement 
    });
  } catch (error) {
    console.error('Update Achievement Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete an achievement by ID
exports.deleteAchievement = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid achievement ID" });
    }

    const deletedAchievement = await Achievement.findByIdAndDelete(id);

    if (!deletedAchievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    res.status(200).json({ 
      message: "Achievement deleted successfully",
      achievement: deletedAchievement 
    });
  } catch (error) {
    console.error('Delete Achievement Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};