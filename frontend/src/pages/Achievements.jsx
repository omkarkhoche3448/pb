import React, { useEffect, useState } from "react";
import {
  getAchievements,
  addAchievement,
  updateAchievement,
} from "../services/achievementService"; // Make sure you have addAchievement in your service
import AchievementCard from "../components/AchievementCard";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleButtonClick = () => {
    if (isAdding) {
      setIsAdding(false);
      setShowForm(false);
    } else {
      setIsAdding(true);
      setShowForm(true);
    }
  };

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await getAchievements();
        setAchievements(response.achievements || []);
      } catch (error) {
        console.error("Failed to fetch achievements:", error);
        setAchievements([]);
      }
    };

    fetchAchievements();
  }, []);

  const handleAchievementUpdate = async (id, updatedData) => {
    try {
      const updatedAchievement = await updateAchievement(id, updatedData);
      setAchievements((prev) =>
        prev.map((achievement) =>
          achievement._id === id ? updatedAchievement : achievement
        )
      );
    } catch (error) {
      console.error("Failed to update achievement:", error);
    }
  };

  const handleAddAchievement = async (e) => {
    e.preventDefault();
    try {
      const data = await addAchievement(newAchievement);
      if (data) {
        setAchievements((prev) => [...prev, data]);
        setShowForm(false); // Close the form after submission
        setNewAchievement({
          title: "",
          description: "",
          date: "",
          icon: "",
        }); // Reset the form fields
      }
    } catch (error) {
      console.error("Failed to add achievement:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Achievements</h1>
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        {isAdding ? "Cancel" : "Add Achievement"}
      </button>

      {showForm && (
        <div className="bg-white p-6 rounded shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">Add New Achievement</h2>
          <form onSubmit={handleAddAchievement}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                placeholder="Title"
                value={newAchievement.title}
                onChange={(e) =>
                  setNewAchievement({
                    ...newAchievement,
                    title: e.target.value,
                  })
                }
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={newAchievement.description}
                placeholder="Description"
                onChange={(e) =>
                  setNewAchievement({
                    ...newAchievement,
                    description: e.target.value,
                  })
                }
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="text"
                placeholder="Date"
                value={newAchievement.date}
                onChange={(e) =>
                  setNewAchievement({ ...newAchievement, date: e.target.value })
                }
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Icon</label>
              <input
                type="text"
                placeholder="Icon"
                value={newAchievement.date}
                onChange={(e) =>
                  setNewAchievement({ ...newAchievement, icon: e.target.value })
                }
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded"
              >
                Save Achievement
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.length > 0 ? (
          achievements.map((achievement) => (
            <AchievementCard
              key={achievement._id}
              achievement={achievement}
              onAchievementUpdate={handleAchievementUpdate}
            />
          ))
        ) : (
          <p>No achievements available.</p>
        )}
      </div>
    </div>
  );
};

export default Achievements;
