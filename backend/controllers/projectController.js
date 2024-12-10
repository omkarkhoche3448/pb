const { Project, uploadImageToCloudinary } = require("../models/projects");
const cloudinary = require("../config/cloudinary");

// Create a new project with image upload
const createProject = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ 
        error: "Image file is required",
        field: "image"
      });
    }
    const { title, category, link } = req.body;
    const missingFields = [];

    if (!title) missingFields.push({ field: 'title', message: 'Title is required' });
    if (!category) missingFields.push({ field: 'category', message: 'Category is required' });
    if (!link) missingFields.push({ field: 'link', message: 'Link is required' });

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        missingFields
      });
    }

    const imageFile = req.files.image;
    const uploadOptions = {
      folder: process.env.CLOUDINARY_FOLDER || "projects",
      transformation: [
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]
    };

    const uploadResponse = await uploadImageToCloudinary(
      imageFile, 
      uploadOptions.folder, 
      null, 
      'auto'
    );

    const newProject = new Project({
      title: title.trim(),
      category: category.trim(),
      link: link.trim(),
      image: uploadResponse.secure_url,
    });

    const savedProject = await newProject.save();

    res.status(201).json({
      message: "Project created successfully",
      project: savedProject,
    });
  } catch (error) {
    console.error("Error creating project:", {
      message: error.message,
      stack: error.stack,
      body: req.body
    });

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: "Validation Error",
        details: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({ 
      error: "Internal server error",
      message: error.message 
    });
  }
};
// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a project by ID
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Handle image upload if new image is present
    if (req.files && req.files.image) {
      const imageFile = req.files.image;
      const uploadResponse = await cloudinary.uploader.upload(
        imageFile.tempFilePath,
        {
          folder: process.env.CLOUDINARY_FOLDER || "projects",
        }
      );
      updateData.image = uploadResponse.secure_url;
    }

    const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a project by ID
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project deleted successfully",
      project: deletedProject,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
};
