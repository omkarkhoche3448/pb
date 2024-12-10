import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getAchievements = async () => {
  try {
    const response = await axios.get(`${API_URL}/achievement/achievements`);
    return response.data;
  } catch (error) {
    console.error('Error fetching achievements:', error);
  }
};

export const addAchievement = async (achievementData) => {
  try {
    const response = await axios.post(`${API_URL}/achievement/achievements`, achievementData);
    return response.data;
  } catch (error) {
    console.error('Error creating Achievements:', error);
  }
};

export const updateAchievement = async (id, achievementData) => {
  try {
    const response = await axios.put(`${API_URL}/achievement/achievements/${id}`, achievementData);
    return response.data;
  } catch (error) {
    console.error('Error updating Achievements:', error);
  }
};

export const deleteAchievement = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/achievement/achievements/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting Achievements:', error);
  }
};
