// src/components/ExperienceCard.jsx
import React from 'react';

const ExperienceCard = ({ experience }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800">{experience.title}</h2>
      <p className="text-gray-600 mt-2">{experience.company}</p>
      <p className="text-gray-500 text-sm">{experience.location}</p>
      <p className="text-gray-500 text-sm">{experience.startDate} - {experience.endDate}</p>

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
    </div>
  );
};

export default ExperienceCard;
