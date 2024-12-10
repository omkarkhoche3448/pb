import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-md" />
      <h3 className="text-xl font-semibold mt-2">{project.title}</h3>
      <p>{project.category}</p>
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Project</a>
    </div>
  );
};

export default ProjectCard;
