import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getExperiences = async () => {
  try {
    const response = await axios.get(`${API_URL}/experience/experiences`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Experiences:', error);
  }
};

export const addExperience = async (ExperiencesData) => {
  try {
    const response = await axios.post(`${API_URL}/experience/experiences`, ExperiencesData);
    return response.data;
  } catch (error) {
    console.error('Error creating Experiences:', error);
  }
};

export const updateExperience = async (id, ExperiencesData) => {
  try {
    const response = await axios.put(`${API_URL}/experience/experiences/${id}`, ExperiencesData);
    return response.data;
  } catch (error) {
    console.error('Error updating Experiences:', error);
  }
};

export const deleteExperience = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/experience/experiences/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting Experiences:', error);
  }
};
