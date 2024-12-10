import React, { useEffect, useState } from 'react';
import { getAchievements, updateAchievement } from '../services/achievementService';
import AchievementCard from '../components/AchievementCard';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);

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

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Achievements</h1>
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
