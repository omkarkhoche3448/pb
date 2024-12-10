const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true, 
  },
  icon: {
    type: String,
  },
});

const Achievement = mongoose.model("Achievement", AchievementSchema);

module.exports = Achievement;
