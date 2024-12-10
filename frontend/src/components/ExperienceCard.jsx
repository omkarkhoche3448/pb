import React, { useState } from 'react';
import { updateExperience, deleteExperience } from '../services/experienceService'; // Import the API service

const ExperienceCard = ({ experience, onExperienceUpdate, onExperienceDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: experience.title,
    company: experience.company,
    location: experience.location,
    startDate: experience.startDate,
    endDate: experience.endDate,
    description: experience.description,
    skills: experience.skills ? experience.skills.join(', ') : '', // Convert skills array to a comma-separated string
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        ...formData,
        skills: formData.skills.split(',').map((skill) => skill.trim()), // Convert back to an array
      };
      const updatedExperience = await updateExperience(experience._id, updatedData);
      onExperienceUpdate(updatedExperience); // Callback to update the parent state
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update experience:', error);
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this experience?");
    if (isConfirmed) {
      try {
        await deleteExperience(experience._id);
        onExperienceDelete(experience._id);
      } catch (error) {
        console.error('Failed to delete experience:', error);
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
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
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Company"
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Location"
            className="w-full p-2 mb-2 border rounded"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              placeholder="Start Date"
              className="w-full p-2 border rounded"
            />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              placeholder="End Date"
              className="w-full p-2 border rounded"
            />
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-2 mt-2 border rounded"
          ></textarea>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleInputChange}
            placeholder="Skills (comma-separated)"
            className="w-full p-2 mt-2 border rounded"
          />
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-green-500 text-white rounded mt-4"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-gray-300 text-black rounded mt-4 ml-2"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{experience.title}</h2>
          <p className="text-gray-600 mt-2">{experience.company}</p>
          <p className="text-gray-500 text-sm">{experience.date}</p>
          <p className="text-gray-700 mt-4">{experience.description}</p>
          {experience.skills && (
            <div className="mt-4">
              <h3 className="font-semibold text-gray-800">Skills:</h3>
              <ul className="list-disc pl-5 mt-2">
                {experience.skills.map((skill, index) => (
                  <li key={index} className="text-gray-600">{skill}</li>
                ))}
              </ul>
            </div>
          )}
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded ml-2"
          >
            Delete  
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;
