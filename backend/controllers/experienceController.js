const Experience = require('../models/experience');
// Create a new experience
exports.createExperience = async (req, res) => {
  try {
    const newExperience = new Experience(req.body);
    await newExperience.save();
    res.status(201).json({ 
      message: "Experience created successfully", 
      experience: newExperience 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all experiences
exports.getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ date: -1 });
    res.status(200).json(experiences);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single experience by ID
exports.getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json(experience);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an experience by ID
exports.updateExperience = async (req, res) => {
  try {
    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!updatedExperience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    
    res.status(200).json({ 
      message: "Experience updated successfully", 
      experience: updatedExperience 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an experience by ID
exports.deleteExperience = async (req, res) => {
  try {
    const deletedExperience = await Experience.findByIdAndDelete(req.params.id);
    
    if (!deletedExperience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    
    res.status(200).json({ 
      message: "Experience deleted successfully",
      experience: deletedExperience 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};