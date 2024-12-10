const Achievement = require('../models/achievements');

// Create a new achievement
exports.createAchievement = async (req, res) => {
  try {
    const newAchievement = new Achievement(req.body);
    await newAchievement.save();
    res.status(201).json({ message: "Achievement created successfully", newAchievement });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all achievements
exports.getAllAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.status(200).json(achievements);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an achievement by ID
exports.updateAchievement = async (req, res) => {
  try {
    const updatedAchievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAchievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }
    res.status(200).json({ message: "Achievement updated successfully", updatedAchievement });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an achievement by ID
exports.deleteAchievement = async (req, res) => {
  try {
    const deletedAchievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!deletedAchievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }
    res.status(200).json({ message: "Achievement deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
