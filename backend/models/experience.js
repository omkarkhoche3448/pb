const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
  },
  company: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true, //  (e.g., "September 2024 - Present")
  },
  description: {
    type: String,
    required: true, 
  },
  skills: {
    type: [String],
  },
});

const Experience = mongoose.model("Experience", ExperienceSchema);

module.exports = Experience;
