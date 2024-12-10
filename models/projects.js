const mongoose = require("mongoose");
const cloudinary = require("./cloudinary"); 
const dotenv = require("dotenv");

dotenv.config(); 
const ProjectSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const Project = mongoose.model("Project", ProjectSchema);

const uploadImageAndCreateProject = async (imageFile, title, category, link) => {
  try {
    const result = await cloudinary.uploader.upload(imageFile, {
      folder: process.env.FOLDER_NAME, 
    });

    const newProject = new Project({
      image: result.secure_url, 
      title,
      category,
      link,
    });

    await newProject.save();
    console.log("Project added successfully");
  } catch (error) {
    console.error("Error uploading image and creating project:", error);
  }
};

module.exports = { Project, uploadImageAndCreateProject };
