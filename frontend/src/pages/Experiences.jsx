import React, { useEffect, useState } from 'react';
import { getExperiences } from '../services/experienceService';
import ExperienceCard from '../components/ExperienceCard';

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      const data = await getExperiences();
      setExperiences(data);
    };

    fetchExperiences();
  }, []);

  const handleExperienceUpdate = (updatedExperience) => {
    setExperiences((prev) =>
      prev.map((exp) =>
        exp._id === updatedExperience._id ? updatedExperience : exp
      )
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Experiences</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((experience) => (
          <ExperienceCard
            key={experience._id}
            experience={experience}
            onExperienceUpdate={handleExperienceUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default Experiences;
