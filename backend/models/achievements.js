const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'] 
  },
  date: {
    type: Date, 
    required: true,
    default: Date.now 
  },
  icon: {
    type: String,
    default: 'default-icon.png' 
  }
}, { 
  timestamps: true
});

const Achievement = mongoose.model("Achievement", AchievementSchema);

module.exports = Achievement;