import React, { useEffect, useState } from 'react';
import { getExperiences, addExperience } from '../services/experienceService'; // Make sure you have addExperience in your service
import ExperienceCard from '../components/ExperienceCard';

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    date: '',
    description: '',
    skills: []
  });

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

  const handleAddExperience = async (e) => {
    e.preventDefault();
    const data = await addExperience(newExperience);
    if (data) {
      setExperiences((prev) => [...prev, data]);
      setShowForm(false); // Close the form after submission
      setNewExperience({
        title: '',
        company: '',
        date: '',
        description: '',
        skills: []
      }); // Reset the form fields
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Experiences</h1>
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-500 text-white p-2 rounded mb-6"
      >
        Add Experience
      </button>

      {showForm && (
        <div className="bg-white p-6 rounded shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">Add New Experience</h2>
          <form onSubmit={handleAddExperience}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={newExperience.title}
                onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Company</label>
              <input
                type="text"
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="text"
                value={newExperience.date}
                onChange={(e) => setNewExperience({ ...newExperience, date: e.target.value })}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={newExperience.description}
                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Skills</label>
              <input
                type="text"
                value={newExperience.skills.join(', ')}
                onChange={(e) => setNewExperience({ ...newExperience, skills: e.target.value.split(',') })}
                className="border p-2 w-full"
                placeholder="Enter skills separated by commas"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded"
              >
                Save Experience
              </button>
            </div>
          </form>
        </div>
      )}

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
