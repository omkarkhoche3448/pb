import React, { useState } from 'react';
import { deleteAchievement } from '../services/achievementService'; // Import the delete API service

const AchievementCard = ({ achievement, onAchievementUpdate, onAchievementDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: achievement.title,
    description: achievement.description,
    date: achievement.date,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    onAchievementUpdate(achievement._id, formData);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this experience?");
    if (isConfirmed) {
      try {
        await deleteAchievement(achievement._id); 
        onAchievementDelete(achievement._id); 
      } catch (error) {
        console.error('Failed to delete achievement:', error);
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
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-2 mb-2 border rounded"
          ></textarea>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full p-2 mb-2 border rounded"
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
          <h2 className="text-xl font-semibold text-gray-800">{achievement.title}</h2>
          <p className="text-gray-600 mt-2">{achievement.description}</p>
          <p className="text-gray-500 text-sm">{achievement.date}</p>
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

export default AchievementCard;
