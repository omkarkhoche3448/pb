import React, { useEffect, useState } from "react";
import { getProjects, createProject } from "../services/projectService"; // Import createProject service
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    link: "",
    image: null,
    category: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects();
      setProjects(data || []);
    };

    fetchProjects();
  }, []);

  const handleProjectUpdate = (updatedProject) => {
    setProjects((prev) =>
      prev.map((proj) =>
        proj._id === updatedProject._id ? updatedProject : proj
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProject((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleAddProject = async () => {
    try {
      const createdProject = await createProject(newProject);
      setProjects((prev) => [...prev, createdProject]);
      setNewProject({
        title: "",
        description: "",
        link: "",
        image: null,
        category: "",
      });
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      {/* Button to toggle the Add Project form */}
      <button
        onClick={() => setIsAdding(!isAdding)}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        {isAdding ? "Cancel" : "Add Project"}
      </button>

      {/* Add Project Form */}
      {isAdding && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <input
            type="text"
            name="title"
            value={newProject.title}
            onChange={handleInputChange}
            placeholder="Project Title"
            className="w-full p-2 mb-4 border rounded"
          />
          <textarea
            name="description"
            value={newProject.description}
            onChange={handleInputChange}
            placeholder="Project Description"
            className="w-full p-2 mb-4 border rounded"
          ></textarea>
          <input
            type="url"
            name="link"
            value={newProject.link}
            onChange={handleInputChange}
            placeholder="Project Link"
            className="w-full p-2 mb-4 border rounded"
          />

          {/* Category Dropdown */}
          <select
            name="category"
            value={newProject.category}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="">Select Category</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Web Design">Web Design</option>
            <option value="Web Application">Web Application</option>
            <option value="hackathon">Hackathon</option>
          </select>

          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full p-2 mb-4 border rounded"
          />
          <button
            onClick={handleAddProject}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Add Project
          </button>
        </div>
      )}

      {/* Display Projects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onProjectUpdate={handleProjectUpdate}
            />
          ))
        ) : (
          <p>No projects available</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
