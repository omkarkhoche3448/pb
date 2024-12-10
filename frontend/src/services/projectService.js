import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects/projects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};

export const createProject = async (projectData) => {
  const formData = new FormData();
  
  formData.append('title', projectData.title);
  formData.append('description', projectData.description);
  formData.append('link', projectData.link);
  formData.append('category', projectData.category);

  if (projectData.image) {
    formData.append('image', projectData.image);
  }
  
  try {
    const response = await axios.post(`${API_URL}/projects/projects`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Project created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
  }
};

export const updateProject = async (id, projectData) => {
  try {
    const response = await axios.put(`${API_URL}/projects/projects/${id}`, projectData);
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error);
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/projects/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
  }
};
