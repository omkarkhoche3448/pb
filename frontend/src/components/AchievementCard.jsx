// src/components/AchievementCard.jsx
import React from 'react';

const AchievementCard = ({ achievement }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800">{achievement.title}</h2>
      <p className="text-gray-600 mt-2">{achievement.organization}</p>
      <p className="text-gray-500 text-sm">{achievement.date}</p>
      
      <p className="text-gray-700 mt-4">{achievement.description}</p>
      
      {achievement.skills && (
        <div className="mt-4">
          <h3 className="font-semibold text-gray-800">Skills Acquired:</h3>
          <ul className="list-disc pl-5 mt-2">
            {achievement.skills.map((skill, index) => (
              <li key={index} className="text-gray-600">{skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AchievementCard;
