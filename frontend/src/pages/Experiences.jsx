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

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Experiences</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.length > 0 ? (
          experiences.map((experience) => (
            <ExperienceCard key={experience._id} experience={experience} />
          ))
        ) : (
          <p>No experiences found.</p>
        )}
      </div>
    </div>
  );
};

export default Experiences;
