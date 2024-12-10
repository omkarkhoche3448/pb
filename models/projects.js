const mongoose = require("mongoose");
const cloudinary = require('cloudinary').v2;
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
}, { 
  timestamps: true
});

const Project = mongoose.model("Project", ProjectSchema);

// Improved Cloudinary upload method
const uploadImageAndCreateProject = async (file, title, category, link) => {
  try {
    // Validate inputs
    if (!file) {
      throw new Error('Image file is required');
    }

    // Upload to Cloudinary with more options
    const uploadOptions = {
      folder: process.env.CLOUDINARY_FOLDER || 'projects',
      resource_type: 'auto', // Automatically detect resource type
      transformation: [
        { quality: 'auto' }, // Automatic quality optimization
        { fetch_format: 'auto' } // Automatic format selection
      ]
    };

    // Upload image
    const result = await cloudinary.uploader.upload(
      file.tempFilePath, 
      uploadOptions
    );

    // Create new project
    const newProject = new Project({
      image: result.secure_url, 
      title,
      category,
      link
    });

    // Save and return the project
    const savedProject = await newProject.save();
    
    console.log("Project added successfully:", savedProject);
    return savedProject;
  } catch (error) {
    console.error("Error uploading image and creating project:", error);
    
    // Throw a more informative error
    throw new Error(`Project creation failed: ${error.message}`);
  }
};

// Helper method for Cloudinary uploads
const uploadImageToCloudinary = async (file, folder, height, quality) => {
  try {
    // Validate input
    if (!file) {
      throw new Error('File is required');
    }

    // Prepare upload options
    const options = { 
      folder: folder || process.env.CLOUDINARY_FOLDER || 'uploads',
      resource_type: 'auto'
    };

    // Add optional parameters
    if (height) options.height = height;
    if (quality) options.quality = quality;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    
    console.log('Image uploaded successfully:', result.secure_url);
    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

module.exports = { 
  Project, 
  uploadImageAndCreateProject,
  uploadImageToCloudinary
};