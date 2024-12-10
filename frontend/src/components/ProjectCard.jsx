import React, { useState } from 'react';
import { updateProject } from '../services/projectService'; 
const ProjectCard = ({ project, onProjectUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: project.title,
    category: project.category,
    link: project.link,
    image: project.image,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const updatedProject = await updateProject(project._id, formData);
      onProjectUpdate(updatedProject); 
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            placeholder="Project Link"
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Image URL"
            className="w-full p-2 mb-2 border rounded"
          />
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-gray-300 text-black rounded ml-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover rounded-md"
          />
          <h3 className="text-xl font-semibold mt-2">{project.title}</h3>
          <p>{project.category}</p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            View Project
          </a>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 ml-4 bg-blue-500 text-white rounded"
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
