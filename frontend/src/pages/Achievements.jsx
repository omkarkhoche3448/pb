import React, { useEffect, useState } from 'react';
import { getAchievements } from '../services/achievementService';
import AchievementCard from '../components/AchievementCard';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      const data = await getAchievements();
      setAchievements(data);
    };

    fetchAchievements();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Achievements</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <AchievementCard key={achievement._id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
};

export default Achievements;
